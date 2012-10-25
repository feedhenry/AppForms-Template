$fh.ready(function() {

  FormModel = Backbone.Model.extend({
    // Determine field type from special classes
    getFieldType: function(field) {
      if (field.Type && field.) {
        console.log(field.Type);
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