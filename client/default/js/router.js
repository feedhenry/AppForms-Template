App.Router = Backbone.Router.extend({
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
                $('.fh_appform_alert_offline').hide();
                $fh.forms.config.online();
            }, false);

            document.addEventListener("offline", function(){
                $fh.forms.log.d("Device offline");
                $('.fh_appform_alert_offline').show();
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
        $('#fh_appform_banner .list li').each(function(i, e) {
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