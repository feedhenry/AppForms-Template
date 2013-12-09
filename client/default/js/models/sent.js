SentModel = SubmissionModel.extend({
});

SentCollection = SubmissionCollection.extend({
  status:"submitted",
  model: SentModel,
  store: new FHBackboneIndexedDataActSync("sent")
});