DraftModel = SubmissionModel.extend({
});

DraftsCollection = SubmissionCollection.extend({
  model: DraftModel,
  status:"draft",
  store: new FHBackboneIndexedDataActSync("drafts")
});

App.collections.drafts = new DraftsCollection();