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
    _(App.collections).forEach(function (collection) {
      collection.on('error', function (collection, msg , options) {
        console.error(msg);
      });
    });

    // Kick things off by fetching when all stores are initialised
    App.collections.forms.fetch();
    App.collections.drafts.fetch();
    App.collections.pending_submitted.fetch();
    App.collections.pending_submitting.fetch();
    App.collections.pending_waiting.fetch();
    App.collections.pending_review.fetch();

    App.config = null;
    $fh.ready(function () {
      //initialise config
      $fh.data({
        act: 'load',
        key: 'client_config'
      }, function (res) {
        // only try set app config if not already done by initial act call
        if (App.config == null && res && res.val && res.val !== '') {
          try {
            // overwrite config with whats in local storage. May be overwritten again by initial act, depending on local storage vs. act call time.
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