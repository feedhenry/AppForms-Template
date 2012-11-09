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

    model.submit(function(err, res) {
      if (err) {
        console.log('Form submission: error :: ' + JSON.stringify(err) + " :: " + JSON.stringify(res));
        switch (err.error) {
        case 'validation':
          App.collections.pending_review.create(model.toJSON());
          model.destroy();
          break;
        case 'network':
          //Error in act call
          App.collections.pending_waiting.create(model.toJSON());
          model.destroy();
          break;
        case 'offline':
          //Offline mode
          App.collections.pending_waiting.create(model.toJSON());
          model.destroy();
        default:
          console.log("Unknown Error")
        }
      } else {
        console.log('Form submission: success :: ' + JSON.stringify(res));
        App.collections.pending_submitted.create(model.toJSON());
        model.destroy();
      }
    });

    return model;
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.pending_submitted = new PendingSubmittedCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();