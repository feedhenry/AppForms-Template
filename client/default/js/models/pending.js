PendingModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function() {
    // Do Nothing
  }
});

PendingWaitingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneIndexedDataActSync("pending-waiting"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});


PendingReviewCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneIndexedDataActSync("pending-review"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});


PendingSubmittingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneIndexedDataActSync("pending-submitting"),
  sync: FHBackboneDataActSyncFn,

  initialize: function() {
    this.on('reset', function(collection, options) {
      $fh.logger.debug("reset called on: " + this.store.name);

      if(collection.models.length) {
        var models = [];
        var copy = function(model,callback){
          model.load(function (err,actual){
            var json = actual.toJSON();
            delete json.error;
            App.collections.pending_waiting.create(json, {success : function onSuccess(){
              models.push(model);
              callback(null,model);
            },error : function onError(err){
              callback(err);
            }});

          });
        };

        async.map(collection.models, copy, function(err, results){
          _(models).forEach(function(model) {
            $fh.logger.debug("pending on reset destroy");
            model.destroy();
          });
        });

      }
    });
  },
  create: function(attributes, options,callback) {
    attributes.savedAt = new Date().getTime();
    $fh.logger.debug("pending.create : attributes.Pages" + attributes.Pages.length);
    var model = Backbone.Collection.prototype.create.call(this, attributes, options);

    $fh.logger.debug("pending.create : model.get(Pages)=" + model.get("Pages").length);

    if(callback == null) {
      callback = function (){};
    }
    $fh.logger.debug("pending create : before submit");
    model.submit(function(err, res) {
      $fh.logger.debug("pending create : after submit err=" , err);
      $fh.logger.debug("pending create : after submit res=" , err);
      $fh.logger.debug("pending.create : after submit model.get(Pages)=" + model.get("Pages").length);
      var modelJson = model.toJSON();
      delete modelJson.error;

      var option = {
        success : function onSuccess(nextModel, resp){
          $fh.logger.debug("pending create : options.onSuccess");
          $fh.logger.debug("pending create success destroy");

          $fh.logger.debug("pending create success         next ="+ nextModel.id);
          $fh.logger.debug("pending create success destroy model="+ model.id);
          model.destroy();
          callback(err,res);
        },
        error : function onError(ferr){
          $fh.logger.debug("pending create : options.onError=" + ferr);
          $fh.logger.debug("pending create error destroy");
          model.destroy();
          callback(err,res);
        }
      };
      if (err) {
        // add error to model json
        modelJson.error = {
          "type": err.type || err.error,
          "details": res
        };
        $fh.logger.debug('Form submission: error :: ' , err, " :: ", res);

        if (/\b(offline|network)\b/.test(err.type)) {
          // error with act call (usually connectivity error) or offline. move to waiting to be resubmitted manually
          $fh.logger.debug("pending_waiting create modelJson="+ modelJson.id );
          App.collections.pending_waiting.create(modelJson,option);
        } else {
          // move to review as the form cannot be resubmitted without being modified
          $fh.logger.debug("pending_review create modelJson="+ modelJson.id);
          App.collections.pending_review.create(modelJson,option);
        }
      } else {
        $fh.logger.debug('Form submission: success :: ' ,res);
        App.collections.sent.create(modelJson,option);
      }
    });


    return model;
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.sent = new SentCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();
