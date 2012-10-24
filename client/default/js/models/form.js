(function($) {

  FormModel = Backbone.Model.extend({});

  FormsCollection = Backbone.Collection.extend({
    model: FormModel
  });

  // Initialize with mock
  
  var form = new FormModel(App.MockForm);
  App.forms_collection = new FormsCollection([form, form]);

})(jQuery);

console.log(App.forms_collection)