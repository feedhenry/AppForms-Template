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

  getTimeout:function (millis) {
    var timeout = App.config.get('default_timeout') || ($fh.legacy.fh_timeout / 1000);
    if(millis) {
      timeout = timeout *1000;
    }
    return timeout;
  },

  handleError: function(e, cb) {
    var type = e.msg  || "unknown";
    var err = e.err;
    var msg;
    $fh.logger.debug("handleError" + Utils.truncate(e,150));
    if(type  === "error_ajaxfail") {

      msg = "Unexpected Network Error : ";// + (err ? err.error : "");
      if(!err.error  || err.error.length === 0 || err.error === "\"error\"") {
        if(err.message && err.message.length !== 0) {
          msg += err.message;
        } else {
          msg += "Unknown";
        }
      } else {
        msg += "Unknown";

      }
      this.showAlert({text : msg}, "error", 5000);
      return cb({error:msg, type:"network"}, msg);
    }

    if(type  === "validation") {
      msg = "Form Validation Error : " + (err ? err : "please fix the errors");
      this.showAlert({text : msg}, "error", 5000);
      return cb({error:msg, type:"validation"}, e.res || msg);
    }

    if(type  === "offline") {
      msg = err || "You are currently offline";
      this.showAlert({text : msg}, "error", 5000);
      return cb({error:msg, type:"network"},msg);
    }

    if(type === "network") {
      msg = "Network Error : " + (err || JSON.stringify(e));
      this.showAlert({text : msg}, "error", 5000);
      return cb({error:type});
    }

    msg = "Unknown Error : " + JSON.stringify(e);
    this.showAlert({text : msg}, "error", 5000);
    return cb({error:msg, type:"unknown"}, msg);
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
    this.showAlert({text : "Form Submitted to cloud"}, "success", self.getTimeout(true) );
    $fh.logger.debug('Form Submitted to cloud: res:' + Utils.truncate(res));
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
          $fh.act({"act":"pollRemoteFormSubmissionComplete","req":{"form_id":form_id}},
                  function (res) {
                    $fh.logger.debug('pollRemoteFormSubmissionComplete process : res=' + Utils.truncate(res) );
                    if ((res.Success && res.Success === 1 && (res.stat && res.stat.completedAt)) || res.err){
                      return callback(res);
                    } else {
                      return callback();
                    }

                  },
                  function onError(msg, err) {
                    $fh.logger.debug('pollRemoteFormSubmissionComplete failed : res=' + Utils.truncate(msg) +'err=' + Utils.truncate(err) );
                    return callback();
                  });
        }, 1000);
      },
      function complete(res) {
        $fh.logger.debug('pollRemoteFormSubmissionComplete complete : res=' + Utils.truncate(res));
        if(res) {
          if (res.Success === 1){

            if(res.stat && res.stat.completedAt){
              self.showAlert({text:"Form Submission complete"}, "success", 5000);
              cb(null, res);
            }
          } else if(res.err  || res.Error) {
            return cb({err: (res.err|| res.Error)});
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
   * @param callback
   */
  submitFormBody: function(req,form, callback) {
    var self = this;
    var data = {"act":"submitFormBody","req":form};
    req.total += JSON.stringify(data).length;
    var timeout = self.getTimeout(true);
    self.showAlert({ text : "Form body : start ", current : req.size, total : req.total}, "success", timeout );
    var start = Date.now();
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res=" + Utils.truncate(res));
      if (res.Success && res.Success === 1) {
        var json = JSON.stringify(data);
        req.size += json.length;
        self.showAlert({ text : "Form body : complete", current : req.size, total : req.total}, "success", timeout);
        callback(null,{name : "submitFormBody", start : start, end : end, size: req.size});
      } else {
        callback({msg:"validation", err:"Please fix the highlighted errors",res:res});
      }
    }, function (msg, err) {
      $fh.logger.debug("submitFormBody failed : msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err,150)+ "'");
      callback({msg : msg,err:err});
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
    var timeout = self.getTimeout(true) ;
    req.current_chunk += 1;
    var title = "Field " + req.current_chunk+  " of "+ req.num_chunks;
    //self.showAlert({text : "Chunk[field=" + chunk.name + "] started", current : req.size, total : req.total}, "success", timeout);
    self.showAlert({text : (title + " started"), current : req.size, total : req.total}, "success", timeout);

    $fh.logger.debug("submitChunk starting value="  + Utils.truncate(value,50));
    $fh.act({
      "act":"submitChunk",
      "retries" : App.config.get("max_retries"),
      "req": chunk
    }, function onSuccess(res) {
      $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "] res='" + Utils.truncate(res ) + "'");
      if (res.Success && res.Success === 1) {
        req.size += len;
        self.showAlert({text : (title + " complete"), current : req.size, total : req.total}, "success", timeout);
        return callback(null, res);
      } else {
        return callback({err:'unknown' , msg: JSON.stringify(res)}, res);
      }
    }, function onError(msg, err) {
      $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "] msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err)+ "'");
      return callback({msg : msg,err:err});
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
    var timeout = self.getTimeout(true);
    $fh.logger.debug("validateFormTransmission [" +form_id + "] started");
    self.showAlert({text : "Form check started " ,current :req.total , total : req.total}, "success", timeout );
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res="+ Utils.truncate(res));
      if (res.Success && res.Success === 1) {
        self.showAlert({text : "Form check complete" ,current :req.total , total : req.total}, "success", timeout );
        return callback(null,{name : "validateFormTransmission", start : start, end : end, size : req.size});
      } else {
        return callback({msg:"validation", err: "Please fix the highlighted errors",res:res});
      }
    }, function onError(msg, err) {
      $fh.logger.debug("validateFormTransmission [" +form_id + "] failed msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err)+ "'");
      return callback({msg : msg,err:err});
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
    $fh.logger.debug("doRemoteFormSubmission[" +form_id + "] started");
    self.showAlert({text : "Remote form submission: started"}, "success", 5000);
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res=" + Utils.truncate(res));
      if (res.Success && res.Success === 1) {
        self.showAlert({text : "Remote form submission: complete"}, "success", 5000);
        return callback(null,{name : "doRemoteFormSubmission", start : start, end : end, size: req.total});
      } else {
        return callback({msg:"validation", err:"Please fix the highlighted errors",res:res});
      }
    }, function onError(msg, err) {
      $fh.logger.debug("doRemoteFormSubmission[" +form_id + "] failed msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err)+ "'");
      return callback({msg : msg,err:err});
    });
  },

  /**
   * split the current form into separate, ordered tasks that can be executed serially :
   * The tasks are :
   *   - submitFormBody (once only and bound to the req, form)
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
          $fh.logger.debug("field name=" + name + ",value=" + Utils.truncate(str) + ",size=" + size);
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
    req.current_chunk = 0;
    // NOTE : put first task at start of array
    tasks.unshift(async.apply(this.submitFormBody, req,form));

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
      Utils.isOnline(function(online) {
        if (online) {
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
          var tasks = self.splitFormIntoTasks(req,form);
          async.series(tasks,function(err, results){
            if (err) {return self.handleError(err,cb);}
            self.doRemoteFormSubmission(req,form_id, function handleResponse(err){
              if (err) {return self.handleError(err,cb);}
              self.pollRemoteFormSubmissionComplete(req,form_id,results, cb);
            });
          });
        } else {
          self.handleError({msg: "offline", err:"Unable to submit the form : you are currently offline"},cb);
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
    $('#fh_wufoo_alerts_area ').empty();

    var message = o.text;
    var percent  = "";
    if(o.current ) {
      var value  = Math.floor((o.current * 100)/ o.total);
      percent = $('<progress>').attr("max", 100).attr("value", value).html($('<strong>').text( message));
      $fh.logger.debug("showAlert current='" + this.toBytes(o.current)  + ", total='" + this.toBytes(o.total) + "%='" + percent );
      alertTpl.append($('<span class="small">').text(message)).append(percent);
    } else {
      alertTpl.append($('<span>').text(message));
    }
    alertTpl.addClass(type);

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
  }});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  // form collection will only fetch minimum form details to populate models. Models will be fetched individually as full detail is required
  store: new FHBackboneDataActSync('forms', 'getForms', 'getForm', 'Hash', 'DateUpdated'),
  sync: FHBackboneDataActSyncFn,

  initialize: function () {
    this.store.on('error', function () {});
  }
});

App.collections.forms = new FormsCollection();
