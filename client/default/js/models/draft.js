DraftModel = FormModel.extend({});

DraftsCollection = Backbone.Collection.extend({
  model: DraftModel,
  fhStorage: new FHBackboneSyncStore("drafts"),
  create: function(attributes, options) {
    attributes.savedAt = new Date();
    Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.drafts = new DraftsCollection();