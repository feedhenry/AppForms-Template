DraftModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function () {
    // Do Nothing
  }

});


DraftsCollection = Backbone.Collection.extend({
  model: DraftModel,
  store: new FHBackboneDataActSync("drafts"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    console.log(attributes);
    attributes.savedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.drafts = new DraftsCollection();