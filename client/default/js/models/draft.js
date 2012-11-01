DraftModel = FormModel.extend({});

DraftsCollection = Backbone.Collection.extend({
  model: DraftModel,
  fhStorage: new Store("drafts", "getForms")
});

App.collections.drafts = new DraftsCollection();