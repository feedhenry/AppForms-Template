$fh.ready(function() {

  DraftModel = Backbone.Model.extend({});

  DraftsCollection = Backbone.Collection.extend({
    model: DraftModel,
    fhStorage: new Store("drafts")
  });
  App.collections.drafts = new DraftsCollection();
});