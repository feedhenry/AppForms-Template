App.Router = Backbone.Router.extend({

  /*

  Known unsupported rules/validation
  - text ranges i.e. 'Range' option e.g. input text/words must be between 1 & 4 long (rules n/a via api or rules json)
  - number ranges i.e. 'Range' option e.g. number value/digits must be between 2 & 8 (rules n/a via api or rules json)
  - matchtype all for rule builder config i.e. Operatior AND to specify multiple conditions before a rule is triggered (TODO)
  - form rules i.e. show message/send email/redirect to website depending on field condition/s (no plans to implement this)
  - file field/ submission size limits i.e. http://help.wufoo.com/app/answers/detail/a_id/5751#file
  - other field size limits e.g. text field 255 character limit

  NOTES:
  - despite all validation rules not being supported, a fallback is in place to highlight validation errors passed back
    from a bad submit to wufoo. Although these errors show which fields are in an error state, they cannot be
    programatically validated on the client, and would required another submit of the form.
  - money field type is n/a via api e.g. $ or €
  - various form settings have not been considered for addition e.g. Captcha 'Limit Activity' option
  - to do a lot of the items above it would probably be necessary to 'read' the FORM_JSON global from
    the form builder page i.e. https://<company>.wufoo.com/build/<form_name>/ (this info n/a from api)

  */

  routes: {
    "form_list": "form_list",
    "*path": "form_list" // Default route
  },

  form_list: function() {
    console.log('route: form_list');
    App.views.form_list = new FormListView();
    App.views.drafts_list = new DraftListView();
    App.views.pending_list = new PendingListView();
    App.views.sent_list = new SentListView();
    App.views.loading = new LoadingView();
    App.views.header = new HeaderView();
    App.views.header.showHome();

    // store error handling
    _(App.collections).forEach(function (collection) {
      collection.on('error', function (collection, msg , options) {
        console.error('collection error:', msg);
      });
      collection.store.on('error', function (msg) {
        console.error('collection store error:', msg);
      });
    });

    // Kick things off by fetching when all stores are initialised
    App.views.loading.show("Loading form list");
    App.collections.forms.fetch();
    App.collections.drafts.fetch();
    App.collections.sent.fetch();
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