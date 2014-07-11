App.Router = Backbone.Router.extend({
    routes: {
        "form_list": "form_list",
        "*path": "form_list" // Default route
    },

    initialize: function() {
        _.bindAll(this, "form_list", "onReady", "onResume", "onConfigLoaded", "reload", "fetchCollections", "onPropsRead");
    },

    form_list: function() {
        var self = this;
        var initRetryLimit = 20;
        var initRetryAttempts = 0;
        self.loadingView = new LoadingCollectionView();
        self.deviceReady = false;
        self.initReady = false;

        function startForms() {
            self.loadingView.show("Initialising Forms", 10);
            $fh.forms.init({}, function() {
                self.loadingView.show("Fetching Theme", 15);
                $fh.forms.getTheme({
                    "fromRemote": true,
                    "css": true
                }, function(err, themeCSS) {
                    if (err) console.error(err);
                    App.views.form_list = new FormListView();
                    App.views.drafts_list = new DraftListView();
                    App.views.pending_list = new PendingListView();
                    App.views.queued_list = new QueuedListView();
                    App.views.review_list = new ReviewListView();
                    App.views.sent_list = new SentListView();
                    App.views.settings = new SettingsView();
                    App.views.header = new HeaderView();
                    

                    $fh.forms.config.mbaasOnline(function(){
                      $fh.forms.log.d("Device online");
                      console.log("Online");
                      $('#fh_appform_alert_offline').addClass('hidden');
                    });

                    $fh.forms.config.mbaasOffline(function(){
                      $fh.forms.log.d("Device offline");
                      console.log("Offline");
                      $('#fh_appform_alert_offline').removeClass('hidden');
                    });
                    
                    self.onReady();
                });
            });
        }

        $fh.ready({}, function() {
            $("#includedContent").load("templates/templates.html");
            
            self.loadingView.show("App Starting", 10);
            if (window.PhoneGap || window.cordova) {
                document.addEventListener("deviceready", function() {
                    self.deviceReady = true;
                }, false);
                document.addEventListener("backbutton", function(){
                    $fh.forms.log.d("Back Button Clicked");
                    if(App.views.form && typeof(App.views.form.backEvent) === 'function'){
                        if(App.views.form.backEvent() === false){//Clicked back while on the first page. Should go home
                            App.views.header.showHome();
                        }
                    } else {
                        App.views.header.showHome();
                    }
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
        this.loadingView.show("App Ready, Loading Form List", 20);

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
        this.fetchCollections("Config Loaded, Fetching Forms", 30);
    },

    reload: function() {
        App.collections.forms.reset();
        this.fetchCollections("Reloading Forms", 10);
    },

    fetchCollections: function(msg, progress) {
        this.loadingView.show(msg, progress);
        App.collections.forms.fetch();

        refreshSubmissionCollections();
    },
    onPropsRead: function(props) {
        this.props = props;
    }
});

App.router = new App.Router();
Backbone.history.start();