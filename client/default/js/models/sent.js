SentModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function() {
    // Do Nothing
  }
});

SentCollection = Backbone.Collection.extend({
  model: SentModel,
  store: new FHBackboneDataActSync("sent"),
  sync: FHBackboneDataActSyncFn,

  initialize: function() {
    this.on('add', this.checkSize);
  },

  checkSize: function() {
    var maxSize = App.config.get('sent_save_max');
    if (this.length > maxSize) {
      var toDelete = this.models.slice(0, this.models.length - maxSize);
      _(toDelete).forEach(function(model) {
        model.destroy();
      });
    }
  },

  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});