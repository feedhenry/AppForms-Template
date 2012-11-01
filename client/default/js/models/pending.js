PendingModel = FormModel.extend({});

PendingCollection = Backbone.Collection.extend({
  model: PendingModel,
  fhStorage: new Store("pending", "getForms")
});

App.collections.pending = new PendingCollection();