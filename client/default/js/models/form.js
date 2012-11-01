FormModel = Backbone.Model.extend({
  defaults: {
    "Theme": "",
    "Pages": [],
    "Rules": [],
    "active_page": null,
    "page_history": []
  },

  initialize: function () {
    var pages = this.get('Pages');
    this.pages = new Pages(pages);

    this.on('change:page_history', function (model, history) {
      model.set('active_page', _(history).last());
    });
  },

  pushPage: function (page) {
    this.attributes.page_history.push(page);
    // manually trigger change event as we're modifying an array
    this.trigger('change:page_history', this, this.attributes.page_history);
  },

  popPage: function () {
    this.attributes.page_history.pop();
    // manually trigger change event as we're modifying an array
    this.trigger('change:page_history', this, this.attributes.page_history);
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