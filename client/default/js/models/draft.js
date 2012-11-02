DraftModel = FormModel.extend({});

DraftsCollection = Backbone.Collection.extend({
  model: DraftModel,
  fhStorage: new FHBackboneSyncStore("drafts")
});

App.collections.drafts = new DraftsCollection();