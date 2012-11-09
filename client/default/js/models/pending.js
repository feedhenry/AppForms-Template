PendingModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function() {
    // Do Nothing
  }
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


PendingSubmittingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneDataActSync("pending-submitting"),
  sync: FHBackboneDataActSyncFn,
  initialize: function() {
    this.on('reset', function(collection, options) {
      var models = [];
      _(collection.models).forEach(function(model) {
        // Remove and add any leftover models in here to the waiting collection
        App.collections.pending_waiting.create(model.toJSON());
        models.push(model);
      });

      _(models).forEach(function(model) {
        model.destroy();
      });
    });
  },
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    var model = Backbone.Collection.prototype.create.call(this, attributes, options);
    return model;
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.pending_submitted = new PendingSubmittedCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();