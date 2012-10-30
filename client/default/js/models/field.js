// field model
FieldModel = Backbone.Model.extend({
  defaults: {
    "Rules":  []
  },
  
  // Determine field type from special classes
  getType: function() {
    var type = this.attributes.Type;
    if (this.attributes.ClassNames) {
      var special_type = this.attributes.ClassNames.split(" ");
      if (special_type.length > 1 && special_type[1].indexOf('fh') === 0) {
        type = special_type[1];
      }
    }
    return type;
  }
});

// fields collection
var Fields = Backbone.Collection.extend({
  model: FieldModel
});