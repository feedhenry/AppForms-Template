PendingModel = FormModel.extend({
});

PendingSubmittingCollection = Backbone.Collection.extend({
  model: PendingModel,
  fhStorage: new FHBackboneSyncStore("pending-submitting"),
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

PendingSubmittedCollection = Backbone.Collection.extend({
  model: PendingModel,
  fhStorage: new FHBackboneSyncStore("pending-submitted"),
  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

PendingReviewCollection = Backbone.Collection.extend({
  model: PendingModel,
  fhStorage: new FHBackboneSyncStore("pending-review"),
  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.pending_submitted = new PendingSubmittedCollection();
App.collections.pending_review = new PendingReviewCollection();