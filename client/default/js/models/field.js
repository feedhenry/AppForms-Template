// field model
FieldModel = Backbone.Model.extend({
  defaults: {
    "Rules":  []
  },
  
  // Determine field type from special classes
  getType: function() {
    var type = this.attributes.Type;
    var cnames =  _.reject(this.attributes.ClassNames.split(" "),function (val){return val == "fhid";});
    if(cnames.length == 1 && cnames[0] == "fh") {
      cnames = [];

    }
    if (cnames.length) {
      var special_type = cnames;
      if (special_type.length > 1 && special_type[1].indexOf('fh') === 0) {
        type = special_type[1];
      }
      // special case for fhcam with subfields
      if ('fhcam' === type && this.attributes.SubFields && this.attributes.SubFields.length) {
        type = 'fhcamGroup';
      }
    }
    return type;
  },

  getNonFhClasses: function () {
    // return all classnames that don't start with fh
    return this.attributes && this.attributes.ClassNames ? this.attributes.ClassNames.replace(/\bfh.*?\s/g, '') : '';
  },

  isIdField: function () {
    return _.find(this.attributes.ClassNames.split(" "),function (val){return val === "fhid";});
  },

  //Returns the serialised field value, ready for submission to wuffoo
  serialize: function() {
    return this.attributes.Value;
  }
});

// fields collection
var Fields = Backbone.Collection.extend({
  model: FieldModel
});