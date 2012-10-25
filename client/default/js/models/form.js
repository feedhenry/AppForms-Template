$fh.ready(function() {

  FormModel = Backbone.Model.extend({
    // Determine field type from special classes
    getFieldType: function(field) {
      if (field.Type && field.ClassNames) {
        var special_type = field.ClassNames.split(" ")[1];
        return special_type;
      } else if (field.Type) {
        return field.Type;
      }
    }
  });

  FormsCollection = Backbone.Collection.extend({
    model: FormModel,
    fhStorage: new Store("forms"),
  });

  // Initialize with mock
  var form = new FormModel(App.MockForm);
  App.collections.forms = new FormsCollection();
  // App.collections.forms.create(form);
  // App.collections.forms.create(form);
  
  // Kick things off by fetching
  App.collections.forms.fetch();
});