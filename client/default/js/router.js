App.Router = Backbone.Router.extend({

  routes: {
    "form_list": "form_list",
    "*path": "form_list" // Default route
  },

  form_list: function() {
    console.log('route: form_list');
    App.form_list = new FormListView();
  },

  pending: function() {
    console.log('route: pending');
  }
});

$fh.ready(function() {
  console.log('*** fh ready!')
  App.router = new App.Router();
  Backbone.history.start();
});

