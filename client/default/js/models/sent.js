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

  maxSize: 5,

  initialize: function() {
    this.on('add', this.checkSize);
  },

  checkSize: function() {
    if (this.length > this.maxSize) {
      var toDelete = this.models.slice(0, this.models.length - this.maxSize);
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