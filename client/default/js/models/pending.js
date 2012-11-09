PendingModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn
});

PendingWaitingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneDataActSync("pending-waiting"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

PendingSubmittingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneDataActSync("pending-submitting"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    var model = Backbone.Collection.prototype.create.call(this, attributes, options);
    return model;
  }
});

PendingSubmittedCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneDataActSync("pending-submitted"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

PendingReviewCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneDataActSync("pending-review"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.pending_submitted = new PendingSubmittedCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();
