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

  initialize: function() {
    _.bindAll(this);
  },

  form_list: function() {
    this.loadingView = new LoadingCollectionView();
    this.loadingView.show("App Starting");


    var self = this;
    $fh.ready({}, function() {
      $fh.init({}, function() {
        /**** LOCAL DEV USAGE *****/
//       $fh.cloud_props.hosts.debugCloudUrl = "http://127.0.0.1:3001";
//       $fh.app_props.host = "http://127.0.0.1:3001";
        $fh.forms.init({}, function() {

          $fh.forms.getTheme({
            "fromRemote": false,
            "css": true
          }, function(err, themeCSS) {
            App.views.form_list = new FormListView();
            App.views.drafts_list = new DraftListView();
            App.views.pending_list = new PendingListView();
            App.views.sent_list = new SentListView();
            App.views.settings = new SettingsView();
            App.views.header = new HeaderView();
            App.views.header.showHome();


            if ($('#fh_appform_style').length > 0) {
              $('#fh_appform_style').html(themeCSS);
            } else {
              $('head').append('<style id="fh_appform_style">' + themeCSS + '</style>');
            }
            if (err) console.error(err);
            self.onReady();
          });
        });
      });
    });
  },

  onReady: function() {

    this.loadingView.show("App Ready, Loading form list");

    $fh.env(this.onPropsRead);
    App.config.on('config:loaded', this.onConfigLoaded);
    App.config.loadConfig();

    // by default, allow fetching on resume event.
    // Can be set to false when taking a pic so refetch doesn't happen on resume from that
    App.resumeFetchAllowed = true;
    document.addEventListener("resume", this.onResume, false);
    var banner = false;
    $('#fh_wufoo_banner .list li').each(function(i, e) {
      banner = true;
    });
  },

  // run App.router.onResume() to test this in browser
  onResume: function() {
    // only trigger resync of forms if NOT resuming after taking a photo
    if (App.resumeFetchAllowed) {
      // Re-fetch on resume
      // NOTE: was originally showing loading view and progress while resyncing after resume.
      //       Not any more. We'll let it happen in background so UI isn't blocking
      // var loadingView = new LoadingCollectionView();
      // loadingView.show("Loading form list");
      // App.collections.forms.store.force(); // do a clear to force a fetch
      App.collections.forms.fetch();
    } else {
      // reset flag to true for next time
      App.resumeFetchAllowed = true;
    }
  },
  onConfigLoaded: function() {
    this.loadingView.show("Config Loaded , fetching forms");
    // to enable debug mode: App.config.set('debug_mode', true);

    App.config.on('change:debug_mode', this.onDebugModeChanged);
    App.config.on('change:white_list', this.onWhitelistChanged);
    App.config.on('change:logger', this.onLoggerChanged);
    App.config.on('change:max_retries', this.onRetriesChanged);
    App.config.on('change:defaults', this.onDefaultsChanged);
    App.config.on('change:timeout', this.onTimeoutChanged);

    this.fetchCollections("Config Loaded , fetching forms");
  },

  reload: function() {
    App.collections.forms.reset();
    this.fetchCollections("reloading forms");
  },

  fetchCollections: function(msg, to) {
    this.loadingView.show(msg);
    // this.fetchTo = setTimeout(this.fetchTimeout,_.isNumber(to) ? to : 20000);
    App.collections.forms.fetch();

    refreshSubmissionCollections();
  },

  fetchTimeout: function() {
    clearTimeout(this.fetchTo);
    this.fetchTo = null;
    this.loadingView.hide();
    App.resumeFetchAllowed = false;
    this.fullyLoaded = true;
    this.onResume();
  },

  onPropsRead: function(props) {
    this.props = props;
    // App.views.about = new AboutView(props);
  },

  onTimeoutChanged: function() {
    var timeout = App.config.getValueOrDefault("timeout");
    if (_.isNumber(timeout)) {
      $fh.ready({}, function() {
        $fh.legacy.fh_timeout = timeout * 1000;
      });
    }
  },

  onLoggerChanged: function() {
    var logger = App.config.getValueOrDefault("logger");
    $('#logger').toggle(logger);
  },

  onRetriesChanged: function() {
    var max_retries = App.config.getValueOrDefault("max_retries");
    //TODO add retry control for formsdk.
    // $fh.retry.toggle(max_retries > 1);
  },

  onDebugModeChanged: function() {
    var debug_mode = App.config.getValueOrDefault("debug_mode");
    $('#debug_mode').toggle(debug_mode);
  },

  onWhitelistChanged: function() {
    var white_list = App.config.getValueOrDefault("white_list") || [];
    var listed = _.find(white_list, function(m) {
      return this.props.uuid.match(Utils.toRegExp(m));
    }, this);
    // on start up the setting icon may not be rendered yet
    setTimeout(function() {
      $('a.settings').toggle( !! listed);
    }, 500);
  },

  onDefaultsChanged: function() {
    this.onLoggerChanged();
    this.onTimeoutChanged();
    this.onWhitelistChanged();
  }
});

App.router = new App.Router();
Backbone.history.start();