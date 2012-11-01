$fh.ready(function() {

  PendingModel = Backbone.Model.extend({});

  PendingCollection = Backbone.Collection.extend({
    model: PendingModel,
    fhStorage: new Store("pending")
  });

  App.collections.pending = new PendingCollection();
});