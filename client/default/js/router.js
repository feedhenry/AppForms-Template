App.Router = Backbone.Router.extend({

    routes: {
        "*path": "form_list" // Default route
    },

    initialize: function() {
        _.bindAll(this, "form_list", "onReady", "onResume", "onConfigLoaded", "fetchCollections", "reload");
    },

    form_list: function() {
        var self = this;

        this.loadingView = new LoadingCollectionView();
        this.loadingView.show("App Starting");


        console.log("Form List");
        $fh.ready({}, function() {
            $fh.on('fhinit', function(err, cloudProps) {
                console.log(cloudProps);
                if (err) console.error("Error on fhinit", err);
                $fh.cloud_props.hosts.url = "https://testing-6fqkkjs2qh001su8z90lw5mt-dev.ac.gen.beta.feedhenry.com";
                $fh.forms.init({}, function() {
                    $fh.forms.getTheme({
                        "fromRemote": false,
                        "css": true
                    }, function(err, themeCSS) {
                        App.views.form_list = new FormListView();
                        App.views.header = new HeaderView();
                        App.views.drafts_list = new DraftListView();
                        App.views.pending_list = new PendingListView();
                        App.views.sent_list = new SentListView();
                        App.views.settings = new SettingsView();

                        App.views.drafts_list.hide();
                        App.views.pending_list.hide();
                        App.views.sent_list.hide();
                        App.views.settings.hide();

                        $.when($.get("css/testGeneratedPhas3.css")).done(function(response) {
                            var css = _.template(response, {
                                color: "blue"
                            });
                            if ($('#fh_appform_style').length > 0) {
                                $('#fh_appform_style').html(css);
                            } else {
                                $('head').append('<style id="fh_appform_style">' + css + '</style>');
                            } if (err) console.error(err);
                            self.onReady();
                        });
                    });
                });
            });
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
        this.loadingView.show("reloading forms");
        this.fetchCollections("reloading forms");
    },

    fetchCollections: function(msg, to) {
        this.loadingView.show(msg);
        App.collections.forms.fetch();

        refreshSubmissionCollections();
    },
    onPropsRead: function(props) {
        this.props = props;
    }
});

App.router = new App.Router();
Backbone.history.start();