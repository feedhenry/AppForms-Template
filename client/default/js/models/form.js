FormModel = Backbone.Model.extend({
  defaults: {
    "Theme": "",
    "Pages": [],
    "Rules": [],
    "active_page": null
  },

  initialize: function () {
    var pages = this.get('Pages');
    this.pages = new Pages(pages);
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