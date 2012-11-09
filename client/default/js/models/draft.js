DraftModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataSyncFn,

  reInitPages: function () {
    // Do Nothing
  }

});


DraftsCollection = Backbone.Collection.extend({
  model: DraftModel,
  store: new FHBackboneDataSync("drafts"),
  sync: FHBackboneDataSyncFn,
  create: function(attributes, options) {
    console.log(attributes)
    attributes.savedAt = new Date().getTime();
    Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.drafts = new DraftsCollection();