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
  create: function(attributes, options,callback) {
    attributes.savedAt = new Date().getTime();
    var model = Backbone.Collection.prototype.create.call(this, attributes, options);

    if(callback === undefined || callback === null) {
      callback = function (){};
    }
    model.submit(function(err, res) {
      var modelJson = model.toJSON();
      if (err) {
        // add error to model json
        modelJson.error = {
          "type": err.error,
          "details": res
        };
        $fh.logger.debug('Form submission: error :: ' , err, " :: ", res);

        if (/\b(offline|network)\b/.test(err.error)) {
          // error with act call (usually connectivity error) or offline. move to waiting to be resubmitted manually
          App.collections.pending_waiting.create(modelJson);
        } else {
          // move to review as the form cannot be resubmitted without being modified
          App.collections.pending_review.create(modelJson);
        }
      } else {
        $fh.logger.debug('Form submission: success :: ' ,res);
        App.collections.sent.create(modelJson);
      }
      // model should added to another collection now. destroy it
      model.destroy(); // TODO check double deletion
      callback(err,res);
    });

    return model;
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.sent = new SentCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();
