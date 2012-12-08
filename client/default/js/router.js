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
    var self = this;
    $fh.logger.debug('route: form_list');
    App.views.form_list = new FormListView();
    App.views.drafts_list = new DraftListView();
    App.views.pending_list = new PendingListView();
    App.views.sent_list = new SentListView();
    var loadingView = new LoadingCollectionView();
    App.views.header = new HeaderView();
    App.views.header.showHome();

    // store error handling
    _(App.collections).forEach(function (collection) {
      collection.on('error', function (collection, msg , options) {
        $fh.logger.error('collection error:', msg);
      });
      collection.store.on('error', function (msg) {
        $fh.logger.error('collection store error:', msg);
      });
    });

    // Kick things off by fetching when all stores are initialised
    loadingView.show("Loading form list");
    App.collections.forms.fetch();
    App.collections.drafts.fetch();
    App.collections.sent.fetch();
    App.collections.pending_submitting.fetch();
    App.collections.pending_waiting.fetch();
    App.collections.pending_review.fetch();

    $fh.ready(function() {
      // by default, allow fetching on resume event.
      // Can be set to false when taking a pic so refetch doesn't happen on resume from that
      App.resumeFetchAllowed = true;
      document.addEventListener("resume", self.onResume, false);
    });

    // to enable debug mode: App.config.set('debug_mode', true);
    // or set config in client_config.js
    App.config.on('change:debug_mode', function () {
      if (App.config.get('debug_mode') === true) {
        $('#debug_mode').removeClass('hidden');
      } else {
        $('#debug_mode').addClass('hidden');
      }
    });

    // to enable debug mode: App.config.set('debug_mode', true);
    // or set config in client_config.js
    App.config.on('change:logger', function () {
      if (App.config.get('logger') === true) {
        $('#logger').removeClass('hidden');
      } else {
        $('#logger').addClass('hidden');
      }
    });
  },

  onResume: function() {
    // only trigger resync of forms if NOT resuming after taking a photo
    if (App.resumeFetchAllowed) {
      $fh.logger.debug('resume fetch in background');
      // Re-fetch on resume
      // NOTE: was originally showing loading view and progress while resyncing after resume.
      //       Not any more. We'll let it happen in background so UI isn't blocking
      // var loadingView = new LoadingCollectionView();
      // loadingView.show("Loading form list");
      App.collections.forms.fetch();
    } else {
      $fh.logger.debug('resume fetch blocked. resetting resume fetch flag');
      // reset flag to true for next time
      App.resumeFetchAllowed = true;
    }
  },

  pending: function() {
    $fh.logger.debug('route: pending');
  }
});

App.router = new App.Router();
Backbone.history.start();