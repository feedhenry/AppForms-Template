$fh.ready(function() {

  PendingModel = Backbone.Model.extend({});

  PendingCollection = Backbone.Collection.extend({
    model: PendingModel,
    fhStorage: new Store("pending"),
  });

  // Initialize with mock
  var pending = new PendingModel(App.MockForm);
  App.collections.pending = new PendingCollection();
  // App.collections.pending.create(pending);
  
  // Kick things off by fetching
  App.collections.pending.fetch();
});