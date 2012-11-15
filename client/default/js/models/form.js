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

  submit: function(cb) {
    var self = this;
    var serialized_form = self.serialize();
    var form_hash = this.attributes.Hash;

    Utils.isOnline(function(online) {
      if (online) {
        $fh.act({
          "act": "postEntry",
          "req": {
            "form_hash": form_hash,
            "data": serialized_form
          }
        }, function(res) {
          console.log("submit resp :: " + JSON.stringify(res));
          if(res.Success && res.Success === 1) {
            cb(null, res);
          } else {
            cb({error : 'validation'}, res);
          }
        }, function(msg, err) {
          console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
          cb({error : 'network'}, msg);
        });
      } else {
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
      self.trigger('error', error);
    });
  }
});

App.collections.forms = new FormsCollection();