App.Router = Backbone.Router.extend({

  routes: {
    "form_list": "form_list",
    "*path": "form_list" // Default route
  },

  form_list: function() {
    console.log('route: form_list');
    App.views.form_list = new FormListView();
    App.views.drafts_list = new DraftListView();
    App.views.pending_list = new PendingListView();
    App.views.header = new HeaderView();
    App.views.header.showHome();

    // store error handling
    App.collections.forms.on('error', function (collection, msg , options) {
      console.error(msg);
    });
    App.collections.drafts.on('error', function (collection, msg , options) {
      console.error(msg);
    });
    App.collections.pending.on('error', function (collection, msg , options) {
      console.error(msg);
    });

    // Kick things off by fetching when all stores are initialised
    App.collections.forms.fhStorage.on('loaded', function () {
      App.collections.forms.fetch();
    });
    App.collections.drafts.fhStorage.on('loaded', function () {
      App.collections.drafts.fetch();
    });
    App.collections.pending.fhStorage.on('loaded', function () {
      App.collections.pending.fetch();
    });

    $fh.ready(function () {
      //initialise config
      $fh.data({
        act: 'load',
        key: 'client_config'
      }, function (res) {
        if (res && res.val && res.val !== '') {
          try {
            // overwrite config with whats in local storage. May be overwritten again when initial act call to getForms responds
            App.config = JSON.parse(res.val);
          } catch(e) {
            //log error, but no action
            console.log('ERROR: parsing config from local storage. Using config defaults:', e);
          }
        } else {
          console.log('No config in local storage. Using config defaults');
        }
      });
    });
  },

  pending: function() {
    console.log('route: pending');
  }
});

App.router = new App.Router();
Backbone.history.start();