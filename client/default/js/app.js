AppController = {
  initialize: function() {
    App.views = {
      main: new MainView({
        el: $("body")
      })
    }
  },

  showView: function(view) {
    if (App.views.current != undefined) {
      $(App.views.current.el).hide();
    }
    App.views.current = view;
    $(App.views.current.el).show();
    view.render();
  }
}

AppController.initialize();