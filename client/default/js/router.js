App.Router = Backbone.Router.extend({

  routes: {
    "form_list": "form_list",
    "search/:query": "search",
    "search/:query/p:page": "search",
    "*path": "form_list" // Default route
  },

  form_list: function() {
    AppController.showView(App.views.main);
  },

  pending: function() {
    alert('pending');
  }
});

App.router = new App.Router();

Backbone.history.start();