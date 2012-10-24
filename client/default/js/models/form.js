$fh.ready(function() {

  FormModel = Backbone.Model.extend({});

  FormsCollection = Backbone.Collection.extend({
    model: FormModel,
    fhStorage: new Store("forms"),
  });

  // Initialize with mock
  var form = new FormModel(App.MockForm);
  App.forms_collection = new FormsCollection([form, form]);

});