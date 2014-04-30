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
        var self = this;
        var initRetryLimit = 20;
        var initRetryAttempts = 0;
        self.loadingView = new LoadingCollectionView();
        self.loadingView.show("App Starting");
        self.deviceReady = false;
        self.initReady = false;

        function startForms() {

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
        }

        $fh.ready({}, function() {

            document.addEventListener("online", function(){
                $fh.forms.log.d("Device online");
                $('.fh_wufoo_alert_offline').hide();
                $fh.forms.config.online();
            }, false);

            document.addEventListener("offline", function(){
                $fh.forms.log.d("Device offline");
                $('.fh_wufoo_alert_offline').show();
                $fh.forms.config.offline();
            }, false);

            if (window.PhoneGap || window.cordova) {
                document.addEventListener("deviceReady", function() {
                    self.deviceReady = true;
                }, false);
            } else {
                self.deviceReady = true;
            }
            $fh.on('fhinit', function(err, cloudProps) {
                console.log("fhinit called");
                if (err) {
                    console.error("Error on fhinit", err);
                }

                self.initReady = true;
            });
            var deviceReadyInterval = setInterval(function() {
                if (self.deviceReady === true && self.initReady === true) {
                    startForms();
                    clearInterval(deviceReadyInterval);
                } else {
                    if(initRetryAttempts > initRetryLimit){
                        console.error("Forms Not Ready Yet. Retry Attempts Exceeded");

                        if(self.deviceReady === true){
                            console.error("Forms Not Ready Yet. Device Ready. Starting in offline mode.");
                            startForms();
                            clearInterval(deviceReadyInterval);
                        } else {
                            console.error("Forms Device Not Ready. Trying again.");
                            initRetryAttempts = 0;
                        }
                    } else {
                        initRetryAttempts += 1;   
                    }
                }
            }, 500);
        });
    },
    onReady: function() {
        this.loadingView.show("App Ready, Loading form list");

        $fh.env(this.onPropsRead);

        // by default, allow fetching on resume event.
        // Can be set to false when taking a pic so refetch doesn't happen on resume from that
        App.resumeFetchAllowed = true;
        document.addEventListener("resume", this.onResume, false);
        var banner = false;
        $('#fh_wufoo_banner .list li').each(function(i, e) {
            banner = true;
        });
        this.onConfigLoaded();
    },

    // run App.router.onResume() to test this in browser
    onResume: function() {
        // only trigger resync of forms if NOT resuming after taking a photo
        if (App.resumeFetchAllowed) {
            App.collections.forms.fetch();
        } else {
            // reset flag to true for next time
            App.resumeFetchAllowed = true;
        }
    },
    onConfigLoaded: function() {
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
    onPropsRead: function(props) {
        this.props = props;
        // App.views.about = new AboutView(props);
    }
});

App.router = new App.Router();
Backbone.history.start();