PendingModel = FormModel.extend({});

PendingCollection = Backbone.Collection.extend({
  model: DraftModel,
  fhStorage: new Store("drafts", "getForms")
});

App.collections.pending = new PendingCollection();