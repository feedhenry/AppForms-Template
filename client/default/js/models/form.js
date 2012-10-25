FormModel = Backbone.Model.extend({
  initialize: function () {
    // initialise collection
    this.fields = new Fields(this.get('Fields'));
  }
});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  fhStorage: new Store("forms")
});

// Initialize with mock
var form = new FormModel(App.MockForm);
App.collections.forms = new FormsCollection();
// App.collections.forms.create(form);
// App.collections.forms.create(form);

// Kick things off by fetching
App.collections.forms.fetch();