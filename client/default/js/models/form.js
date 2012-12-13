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
    $fh.logger.debug("cacheChunk field='" , name );
    $fh.logger.debug("cacheChunk content_type='" , chunk.content_type);
    $fh.logger.debug("cacheChunk filename='" , chunk.filename);
    $fh.logger.debug("cacheChunk size='" , chunk.fileBase64.length);
  },

  cacheChunk:function (serialized_form,form_hash,name,value, callback) {
    var key = guid();
    $fh.logger.debug("cacheChunk starting");
    this.dumpChunk(name ,value);

    $fh.act({
      "act":"cacheChunk",
      "retries" : App.config.get("max_retries"),
      "req":{
        "key":key,
        "data":{"key":key, "name":name, "value":value, "form_hash":form_hash}
      }
    }, function (res) {
      $fh.logger.debug("cacheChunk name='" , name , "',res='" , res);
      if (res.Success && res.Success === 1) {
        serialized_form[name] = {content_type:"ref", ref:key};
        callback(null, res);
      } else {
        callback({error:'validation'}, res);
      }
    }, function (msg, err) {
      callback({error:'network'}, msg);
    });
  },
  submit: function(cb) {
    var self = this;
    var serialized_form = self.serialize();
    var form_hash = this.attributes.Hash;

    Utils.isOnline(function(online) {
      if (online) {
        //var chunkTasks = [function noOp(callback) {callback()}];
        var chunkTasks = [];
        if(App.config.get("use_chunking")) {
          chunkTasks = _.collect(serialized_form, function chunkHandler(value,key){
            if (_.isObject(value) && !_.isUndefined(value.filename)) {
              $fh.logger.debug("value=",value);
              return async.apply(self.cacheChunk,serialized_form,form_hash,key,value);
            } else {
              return null;
            }
          });
          chunkTasks = _.compact(chunkTasks);
        }
        async.series(chunkTasks, function onComplete(err, results) {
          if(err) {
            $fh.logger.debug("form.submit err", err, ",results=", results);
            self.showAlert("Unexpected Network error, please try again later", "error" ,5000);
            return cb({error:'network'}, err);
          }
          $fh.act({
            "act": "postEntry",
            "req": {
              "form_hash": form_hash,
              "data": serialized_form
            }
          }, function(res) {
            $fh.logger.debug("submit res=" , res);
            if(res.Success && res.Success === 1) {
              self.showAlert("Form Successfully Submitted", "success" ,5000);
              $fh.logger.debug('Form Successfully Submitted: res:' ,res);
              cb(null, res);
            } else {
              self.showAlert("Form is invalid, Please fix the highlighted errors", "error" ,5000);
              $fh.logger.error('Form is invalid, Please fix the highlighted errors: res:' ,res);
              cb({error : 'validation'}, res);
            }
          }, function(msg, err) {
            self.showAlert("Unexpected Network error, please try again later", "error" ,5000);
            $fh.logger.error('Cloud call failed with error:' ,  msg , '. Error properties:' ,err);
            cb({error : 'network'}, msg);
          });
        });
      } else {
        self.showAlert("Unable to submit the form : you are currently offline", "error" ,5000);
        $fh.logger.error('Cloud call failed with error:' ,  msg , '. Error properties:' ,err);
        cb({error : 'offline'}, 'offline');
      }
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

  showAlert: function(message, type, timeout) {
    var alertTpl = $('<div>').addClass('fh_wufoo_alert');

    alertTpl.addClass(type);
    alertTpl.text(message);

    $('#fh_wufoo_alerts_area').append(alertTpl);

    setTimeout(function() {
      alertTpl.slideUp(function() {
        $(this).remove();
      });
    }, timeout || 10000);
  }

});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  // form collection will only fetch minimum form details to populate models. Models will be fetched individually as full detail is required
  store: new FHBackboneDataActSync('forms', 'getForms', 'getForm', 'Hash', 'DateUpdated'),
  sync: FHBackboneDataActSyncFn,

  initialize: function () {
    var self = this;
    this.store.on('error', function (error) {
      //self.trigger('error', error);
    });
  }
});

App.collections.forms = new FormsCollection();