PendingModel = FormModel.extend({
});

PendingCollection = Backbone.Collection.extend({
  model: PendingModel,
  fhStorage: new FHBackboneSyncStore("pending"),
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.pending = new PendingCollection();