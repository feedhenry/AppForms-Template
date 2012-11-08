PageModel = Backbone.Model.extend({
  defaults: {
    "Title": "",
    "Fields": [],
    "Rules": []
  },

  initialize: function () {
    var fields = this.get('Fields');
    this.fields = new Fields(fields);
  },

  toJSON: function () {
    var self = this;
    var page = Backbone.Model.prototype.toJSON.apply(this, arguments);
    page.Fields = self.fields.toJSON();
    return page;
  },

  serialize: function() {
    var self = this;
    var serialized_page = {};
    self.fields.each(function (field) {
      $.extend(serialized_page, field.serialize());
    });
    return serialized_page;
  }
});

// pages collection
var Pages = Backbone.Collection.extend({
  model: PageModel
});