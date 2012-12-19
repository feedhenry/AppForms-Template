FormModel = Backbone.Model.extend({
  idAttribute: 'Hash',
  sync: FHBackboneDataActSyncFn,
  defaults: {
    "Theme": "",
    "Pages": [],
    "Rules": [],
    "active_page": null,
    "page_history": []
  },

  initialize: function () {
    _.bindAll(this);

    this.initPages();

    // if model changes, re-initialise sub-collection of pages
    this.bind('change', this.reInitPages, this);
    this.on('change:page_history', function (model, history) {
      model.set('active_page', _(history).last());
    });
  },

  reInitPages: function () {
    this.initPages();
  },

  initPages: function () {
    var pages = this.get('Pages');
    this.pages = new Pages(pages);
  },

  pushPage: function (page) {
    this.attributes.page_history.push(page);
    // manually trigger change event as we're modifying an array
    this.trigger('change:page_history', this, this.attributes.page_history);
  },

  popPage: function () {
    this.attributes.page_history.pop();
    // manually trigger change event as we're modifying an array
    this.trigger('change:page_history', this, this.attributes.page_history);
  },

  emptyPageHistory: function () {
    this.attributes.page_history = [];
    this.attributes.active_page = null;
  },

  toJSON: function () {
    var self = this;
    var form = Backbone.Model.prototype.toJSON.apply(this, arguments);
    form.Pages = self.pages.toJSON();
    return form;
  },

  dumpChunk:function (name,chunk) {
    $fh.logger.debug("dumpChunk field='" , name );
    if(chunk) {
      $fh.logger.debug("dumpChunk content_type='" + chunk.content_type);
      $fh.logger.debug("dumpChunk filename='" + chunk.filename);
      $fh.logger.debug("dumpChunk size='" + (chunk.fileBase64 ? chunk.fileBase64.length : 0));
      $fh.logger.debug("dumpChunk fileBase64='" +this.truncate(chunk.fileBase64));
    } else {
      $fh.logger.debug("dumpChunk chunk=empty" );
    }
  },

  getTimeout:function () {
    return App.config.get('default_timeout') || ($fh.legacy.fh_timeout / 1000);
  },

  checkNetworkRate:function (req) {
    var start = req.start;
    var end   = req.end;
    var size  = req.total;
    var max   = req.max;

    var elapsed = end - start; // time in milliseconds
    var actual   = ((size / elapsed) * 1000)/1024;

    var timeout  = this.getTimeout();
    var required = (max / timeout) /1024;

    $fh.logger.debug("checkNetworkRate required=" + required + ", actual  = " + actual);

    return {ok : actual > required,  actual :actual, required:  required};
  },
  handleError: function(msg, cb) {
    $fh.logger.debug("handleError" + this.truncate(msg));
    this.showAlert({text : JSON.stringify(msg)}, "error", 5000);
    var type = 'unknown';
    if (_.isObject(msg)) {
      msg = msg.error;
      type = msg;
    }
    if(msg.indexOf("invalid") != -1) {
      type = 'validation';
    } else if(msg.indexOf("offline") != -1) {
      type = 'offline';
    } else if(msg.indexOf("network") != -1) {
      type = 'network';
    }
    return cb({error:type}, msg);
  },

  toBytes: function(len){
    var size = len +" bytes";
    if(len > 1024) {
      size = (Math.floor((len/ 1024) * 1000) / 1000) +" Kilo bytes";
    }
    return size;
  },

  /**
   * poll the request, function will poll for up timeout seconds every second
   *
   * @param req memo of the request
   * @param form_id the form id
   * @param res the results from the tasks
   * @param cb
   */
  pollRemoteFormSubmissionComplete: function(req,form_id,res, cb) {
    var self = this;
    this.showAlert({text : "Form Submitted to cloud"}, "success", 5000);
    $fh.logger.debug('Form Submitted to cloud: res:' + self.truncate(res));
    var poll = async.apply($fh.act,{"act":"pollRemoteFormSubmissionComplete","req":{"form_id":form_id}});
    var timeout  = this.getTimeout();
    var start = Math.floor(Date.now() / 1000);
    var complete = false;

    async.whilst(
      function check() {
        var end = Math.floor(Date.now() / 1000);
        var delta = end -start ;
        $fh.logger.debug('pollRemoteFormSubmissionComplete check : delta < timeout=' + delta < timeout);
        return delta < timeout ;
      },
      function process(callback) {
        setTimeout(function () {
          poll(function (res) {
            $fh.logger.debug('pollRemoteFormSubmissionComplete process : res=' + self.truncate(res) );
            if ((res.Success && res.Success === 1 && (res.stat && res.stat.completedAt)) || res.err){
              callback(res);
            } else {
              callback();
            }
          });
        }, 1000);
      },
      function complete(res) {
        $fh.logger.debug('pollRemoteFormSubmissionComplete complete : res=' + self.truncate(res));
        if(res) {
          if (res.Success === 1){

            if(res.stat && res.stat.completedAt){
              self.showAlert({text:"Form Submission complete"}, "success", 5000);
              cb(null, res);
            }
          } else if(res.err  || res.Error) {
            return self.handleError(res.err|| res.Error,cb);
          }

        } else {
          console.log("test");
        }
      }
    );
  },
  /**
   * submitFormBody the form body to the cloud, if there are no file form elements then
   * validate form submission can be called immediately
   * @param req memo for the request
   * @param form the form
   * @param dummy boolean, put dummy data into the body do that a proper Kbps
   * @param callback
   */
  submitFormBody: function(req,form, dummy, callback) {
    var self = this;
    var data = {"act":"submitFormBody","req":form};
    if(dummy) {
      data.req.dummy = self.DUMMY_IMAGE;
    }
    req.total += JSON.stringify(data).length;
    var start = Date.now();
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res=" + self.truncate(res));
      if (res.Success && res.Success === 1) {
        var json = JSON.stringify(data);
        var len = json.length;
        req.size += len;
        self.showAlert({ text : "Submitted form body ", current : req.size, total : req.total}, "success", 5000);
        return callback(null,{name : "submitFormBody", start : start, end : end, size: req.size});
      } else {
        return self.handleError("Form is invalid, Please fix the highlighted errors",callback);
      }
    });
  },

  /**
   * submit a file chunk to the cloud
   * @param req memo for form sumission
   * @param chunk e.g. {form_id:form_id, "name":name,"value":value , "size":value.length};
   * @param callback
   */
  submitChunk: function(req,chunk, callback) {
    var self = this;
    $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "]");
    var value = chunk.value;
    var len =  value.fileBase64.length;

    $fh.logger.debug("submitChunk starting value="  + self.truncate(value,50));
    $fh.act({
      "act":"submitChunk",
      "retries" : App.config.get("max_retries"),
      "req": chunk
    }, function (res) {
      $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "] res='" + self.truncate(res ) + "'");
      if (res.Success && res.Success === 1) {
        req.size += len;
        self.showAlert({text : "Submitted chunk[field=" + chunk.name + "]", current : req.size, total : req.total}, "success", 5000);
        callback(null, res);
      } else {
        callback({error:'unknown'}, res);
      }
    }, function (msg, err) {
      $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "] msg='"  + self.truncate(msg) +"' err='" + self.truncate(err)+ "'");
      callback({error:'network'}, msg);
    });
  },

  /**
   * confirm with the cloud server that the form is all in place
   * @param req the form request memo
   * @param form_id the id of the form
   * @param callback
   */
  validateFormTransmission: function(req,form_id, callback) {
    var self = this;
    var data = {"act":"validateFormTransmission","req":{form_id:form_id}};
    var start = Date.now();
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res="+ self.truncate(res));
      if (res.Success && res.Success === 1) {
        self.showAlert({text : "Form submitted to cloud " ,current :req.total , total : req.total}, "success", 5000);
        return callback(null,{name : "validateFormTransmission", start : start, end : end, size : req.size});
      } else {
        return self.handleError("Form is invalid, Please fix the highlighted errors",callback);
      }
    });
  },

  /**
   * tell the cloud to submit the request to wufoo (you should have called validateFormTransmission first)
   * @param req the memo for the form submission
   * @param form_id the form id
   * @param callback
   */
  doRemoteFormSubmission: function(req,form_id, callback) {
    var self = this;
    var data = {"act":"doRemoteFormSubmission","req":{form_id:form_id}};
    var start = Date.now();
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res=" + self.truncate(res));
      if (res.Success && res.Success === 1) {
        self.showAlert({text : "Starting submission to wufoo"}, "success", 5000);
        return callback(null,{name : "doRemoteFormSubmission", start : start, end : end, size: req.total});
      } else {
        return self.handleError("Form is invalid, Please fix the highlighted errors",callback);
      }
    });
  },

  /**
   * split the current form into separate, ordered tasks that can be executed serially :
   * The tasks are :
   *   - submitFormBody (once only and bound to the req, form and add dummy)
   *   - submitChunk (0 or more , bound to the req, chunk)
   *   - validateFormTransmission (once only and bound to the req, form id)
   *
   * @param req a memo object for this submission
   * @param form the serialized form
   * @return an array of tasks
   */
  splitFormIntoTasks: function(req,form) {
    $fh.logger.debug("splitFormIntoTasks starting");
    var self = this;
    var tasks  = [];
    var serialized_form = form.data;
    var form_id = req.form_id;
    if(App.config.get("use_chunking")) {
      _.each(serialized_form, function chunkHandler(value,name){
        if (_.isObject(value) && !_.isUndefined(value.filename)) {
          var str = JSON.stringify(value);
          var size = str.length;
          $fh.logger.debug("field name=" + name + ",value=" + self.truncate(str) + ",size=" + size);
          req.max = Math.max(req.max, size);
          req.chunks.push({name:name, size:size});
          req.total += size;
          var chunk = {form_id:form_id, "name":name,"value":value , "size":size};
          serialized_form[name] = {content_type:"ref", form_id:form_id, name:name};
          var func = async.apply(self.submitChunk, req,chunk);
          func.name = name;
          tasks.push(func);
        }
      });
    }
    req.num_chunks = req.chunks.length;
    var dummy = tasks.length;
    // NOTE : put first task at start of array
    tasks.unshift(async.apply(this.submitFormBody, req,form, dummy <= 0 ));

    tasks.push(async.apply(this.validateFormTransmission, req,form_id));

    $fh.logger.debug("splitFormIntoTasks complete tasks.length=" + tasks.length);
    return tasks;
  },

  /**
   * submit the current form :
   *
   * Algorithm works some thing like :
   *
   *   generate a form_id (from the form hash , form.id , device uuid)
   *   FOR each file element in the the form
   *     remove the current file element and add a reference in its place
   *     add a task to the list for this form element containing the form_id and element field name
   *   IF tasks.length > 0
   *     add dummy profiling data to the form
   *   start a timer
   *   Submit the form keyed on the form id
   *   IF submission failed
   *     inform the user user and exit
   *   ELSE submission succeeded
   *     stop the timer and calculate KBps
   *     FOR each task in the list
   *       execute the task to submit the form element
   *       IF task fails
   *         inform the user of failure and exit
   *     IF !cloud.validateFormTransmission form_id
   *       inform the user of failure and exit
   *     IF !cloud.doRemoteFormSubmission form_id
   *       inform the user of failure and exit
   *     start timer
   *     WHILE !timer timed out
   *       IF cloud.pollRemoteFormSubmissionComplete form_id
   *         inform the user of success and exit
   *
   *     inform the user of timeout and exit (note, in this case since the submission has started, it is still possible to manual poll the request)
   *
   * @param cb callback called on completion
   */
  submit: function(cb) {
    var self = this;
    $fh.env({}, function(props) {
      var serialized_form = self.serialize();
      var form_hash = self.attributes.Hash;
      var form_id = [form_hash,props.uuid,self.id].join("/");
      var form = {
        "form_hash":form_hash,
        "form_id":form_id,
        "data":serialized_form
      };
      var req = {start : Date.now(),
                 size : 0,
                 total: 0,
                 max :-1,
                 chunks : [],
                 form_id:form.form_id
      };
      Utils.isOnline(function(online) {
        if (online) {
          var tasks = self.splitFormIntoTasks(req,form);
          async.series(tasks,function(err, results){
            if (err) {return self.handleError(err,cb);}
            self.doRemoteFormSubmission(req,form_id, function handleResponse(err){
              if (err) {return self.handleError(err,cb);}
              self.pollRemoteFormSubmissionComplete(req,form_id,results, cb);
            });
          });
        } else {
          return self.handleError("Unable to submit the form : you are currently offline",cb);
        }
      });
    });
  },

  serialize: function() {
    var self = this;
    var serialized_form = {};
    self.pages.each(function (page) {
      $.extend(serialized_form, page.serialize());
    });
    return serialized_form;
  },

  showAlert: function(o, type, timeout) {
    var alertTpl = $('<div>').addClass('fh_wufoo_alert');

    var message = o.text;
    var percent  = "";
    if(o.current ) {
      var value  = Math.floor((o.current * 100)/ o.total);
      percent = $('<progress>').attr("max", 100).attr("value", value).html($('<strong>').text( value + " %"));
      $fh.logger.debug("showAlert current='" + this.toBytes(o.current)  + ", total='" + this.toBytes(o.total) + "%='" + percent );
    }
    alertTpl.addClass(type);
    alertTpl.append($('<span>').text(message)).append(percent);

    var el = $('#fh_wufoo_alerts_area .' + type);
    if(el.length) {
      el.replaceWith(alertTpl);
    } else {
      $('#fh_wufoo_alerts_area').append(alertTpl);
    }


    setTimeout(function() {
      alertTpl.slideUp(function() {
        $(this).remove();
      });
    }, timeout || 10000);
  },
  truncate :function(o,len, chars) {
    if(o=== null || o === undefined) {
      return "";
    }
    var str = o;
    if(!_.isString(o)) {
      str = JSON.stringify(o);
    }
    len = len || 25;
    chars = chars || '...';
    var slen = str.length;
    if(slen > len ) {
      str = str.substring(0,Math.min(slen, len ) - chars.length )  + chars;
    }
    return str;
  },
  DUMMY_IMAGE : 'data:image/jpeg;base64,R0lGODlhHQEpAPcAAP39/v79/vz9//z+/v///vz//lpXWP/9///+/vz9/v3+/f3//f7//f/9/v7+/fz//f79/fz+/f39/fz9/VlXWP///TEtLpCOj/CWgP/+/ZCPj/fLwMfHxsbHxkxJSv/9/cbHx8bGxv38//z8/1pXV3VzdMbGx/78/o+Oj/38/v78/8bFx8fGx5GOjz47PMfHx8bFxvv+/8fGxuI6Efv9/pGPj/z8/v78/f3y72dlZoOBgvv//+dhQGhlZsjGx/W9sPOwoPbKv+x8YMfFx8fFxnZzdMjHxp2dnf38/ehiQfv+/tTU1dXU1MjGxllXV+VUMfGjkPDw8PDx8JCOjtbU1fz8/eZUMe/w8NTV1f/8/8jHx+diQOdiQfbJv+hhQY+Pj/v//tbV1e6JcO7w8J2cnPDv8epvUI+OjnVzc+Pi4p2cnbm4ubm5uaypq/nYz+/x8OdhQfXKv+Hj4+hhQPv//T87PPHw8fHx8ePh456cneLh41pWWNXV1e7x8NTV02dlZePi456dnZ2bnfbIv/bJvvbKvvnx7+Pj4u/v8ePi4dXT1OHi4/v9/5CPjvCij+t8YPvl3/Dw8fHx8MjFx4SBgrq4uNbU1PTKv/zx7+hiQKupqp6cnKyqq4KBgfji3/v9/f/8/eLj4vvx76qrqu/w8e+VgPXJv/vw7/Hv752bnP/8/vrl3YOBgfDx8e6WgNXU1bi4ubm3uPTIv6yrqvjXz9TT1e2JcOluUPrj3ayrq/v8/llWWOluUaqpqvry7tTU1O6VgPv8/+t7YfDx77q4uZGPju+Vf+Hj4vOwn/zw76yqqvnl3fXKvvjXzvKvn/v+/et7YMXFxvTJv+/v7+7v8aurqp2dnOPj4dPV1Lm5uOt8Ybq5uFpWV9bV1Kuqq/vx7uLi4fO9r/rv7/7+/GhkZuLh4vGij7i5uOHh49XU06urq/S8rqqrq5GOjvHx7+Hj4f/+//z+//z///39//79//7+/v7//v3//v3+/v7///3+//7+//3//yMfIOAtAf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE4MDgzRUI4M0M2MkJEN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5NkE3NEU2N0RDNTExRTFBQ0FFRTVCQzUwQjI5Q0E2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NkE3NEU1N0RDNTExRTFBQ0FFRTVCQzUwQjI5Q0E2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUI2MUMwQzg5MjA2ODExOEE2REY3NTdFMjY4QjBFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExODA4M0VCODNDNjJCRDdDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdm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'
});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  // form collection will only fetch minimum form details to populate models. Models will be fetched individually as full detail is required
  store: new FHBackboneDataActSync('forms', 'getForms', 'getForm', 'Hash', 'DateUpdated'),
  sync: FHBackboneDataActSyncFn,

  initialize: function () {
    var self = this;
    this.store.on('error', function (error) {
    });
  }
});

App.collections.forms = new FormsCollection();