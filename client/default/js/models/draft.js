$fh.ready(function() {

  DraftModel = Backbone.Model.extend({});

  DraftsCollection = Backbone.Collection.extend({
    model: DraftModel,
    fhStorage: new Store("drafts"),
  });

  // Initialize with mock
  var draft = new DraftModel(App.MockForm);
  App.collections.drafts = new DraftsCollection();
  // App.collections.drafts.create(draft);
  
  // Kick things off by fetching
  App.collections.drafts.fetch();
});