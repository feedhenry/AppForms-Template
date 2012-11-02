PendingModel = FormModel.extend({});

PendingCollection = Backbone.Collection.extend({
  model: PendingModel,
  fhStorage: new FHBackboneSyncStore("pending")
});

App.collections.pending = new PendingCollection();