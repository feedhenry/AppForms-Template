PageModel = Backbone.Model.extend({
  initialize: function () {
    var fields = this.get('Fields');
    this.fields = new Fields(fields);
  }
});

// pages collection
var Pages = Backbone.Collection.extend({
  model: PageModel
});