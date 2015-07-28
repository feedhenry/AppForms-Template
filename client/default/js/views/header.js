HeaderView = Backbone.View.extend({
    el: '#fh_appform_header',

    events: {},

    initialize: function() {
        var self = this;
        this.undelegateEvents();
        _.bindAll(this, 'render', 'advise', 'adviseAll', 'showHome', 'showDrafts', 'showPending', 'updateCounts');
        this.initialising = false;

        this.listenTo(App.collections.drafts, 'add remove reset', this.updateCounts);
        this.listenTo(App.collections.pending_submitting, 'add remove reset', this.updateCounts);
        this.listenTo(App.collections.pending_review, 'add remove reset', this.updateCounts);
        this.listenTo(App.collections.pending_waiting, 'add remove reset', this.updateCounts);
        this.listenTo(App.collections.sent, 'add remove reset', this.updateCounts);  
        
        this.adviseAll();
        this.render();
    },

    render: function() {
        var self = this;
        $(this.$el).empty();

        var header = $(_.template($('#header-list').html(), {})());

        $(this.$el).append(header);

        $('.header_drafts').click(function(e) {
            self.showDrafts();
        });

        $('.header_forms').click(function(e) {
            self.showHome();
        });

        $('.header_pending').click(function(e) {
            self.showPending();
        });

        $('.header_queued').click(function(e) {
            self.showQueued();
        });

        $('.header_review').click(function(e) {
            self.showReview();
        });

        $('.header_sent').click(function(e) {
            self.showSent();
        });

        $('.header_settings').click(function(e) {
            self.showSettings();
        });

        $('#fh_appform_header_toggle_button').click(function(e) {
            $('.row-offcanvas').toggleClass('active');
            $('#fh_appform_header').toggleClass('active');
        });

        $(document).click(function(e) {
            if (!$(e.target).hasClass('navbar-toggle') && !$(e.target).hasClass('icon-bar')) {
                self.hideMenu();
            }
        });

        $(this.$el).show();
    },
    adviseAll: function() {
        this.showHome = this.advise(this.showHome);
        this.showDrafts = this.advise(this.showDrafts);
        this.showPending = this.advise(this.showPending);
        this.showQueued = this.advise(this.showQueued);
        this.showReview = this.advise(this.showReview);
        this.showSent = this.advise(this.showSent);
        this.showSettings = this.advise(this.showSettings);
    },
    advise: function(func) {
        var self = this;
        return function() {
            var skip = false;
            var args = arguments;
            if (args.length && args[0] === true) {
                skip = true;
            }
            var proceed = function(clear) {
                try {
                    return func.call(self, args);
                } finally {
                    if (clear && App.views.form) {
                        App.views.form = null;
                    }
                }
            };
            if (skip || App.views.form == null || App.views.form.readonly) {
                return proceed();
            } else {

                if (App.views.form.isFormEdited()) {
                    AlertView.confirm({
                        message: 'It looks like you have unsaved data -- if you leave before submitting your changes will be lost. Continue?'
                    }, function(confirmDelete){
                        if (confirmDelete) {
                            return proceed(true);
                        } else {
                            return false;
                        }
                    });
                } else {
                    proceed(true);
                }
            }
        };
    },

    hideMenu: function() {
        console.log("hideMenu");
        $('.row-offcanvas').removeClass('active');
        $('#fh_appform_header').removeClass('active');
        this.updateCounts();
    },

    showHome: function(e) {
        console.log("showHome");
        this.hideMenu();

        this.hideAll();
        App.views.form_list.show();
        return false;
    },

    showDrafts: function(e) {
        this.hideMenu();
        this.hideAll();
        App.views.drafts_list.show();
        return false;
    },

    showPending: function(e) {
        this.hideMenu();
        this.hideAll();
        App.views.pending_list.show();
        return false;
    },

    showQueued: function(e) {
        this.hideMenu();
        this.hideAll();
        App.views.queued_list.show();
        return false;
    },

    showReview: function(e) {
        this.hideMenu();
        this.hideAll();
        App.views.review_list.show();
        return false;
    },

    showSent: function(e) {
        this.hideMenu();
        this.hideAll();
        App.views.sent_list.show();
        return false;
    },

    showSettings: function(e) {
        this.hideMenu();
        this.hideAll();
        App.views.settings.show();
        return false;
    },
    hideAll: function() {
        App.views.form_list.hide();
        App.views.drafts_list.hide();
        App.views.pending_list.hide();
        App.views.queued_list.hide();
        App.views.review_list.hide();
        App.views.sent_list.hide();
        App.views.settings.hide();
        $('#fh_appform_content').hide();
        if (_.isObject(App.views.form)) {
            App.views.form.$el.empty();
            App.views.form = null;
        }
    },

    markActive: function(tab_class, headerText) {
        var self = this;
        tab_class = tab_class ? tab_class : "";
        tab_class = "." + tab_class;
        $('.nav.navbar-nav li').removeClass('active');
        $(tab_class).addClass('active');

        var appName = "App Forms";

        if ($fh.app_props.apptitle) {
            appName = $fh.app_props.apptitle;
        }

        if (headerText) {
            $('.navbar-header .navbar-brand').html("<div class='fh_appform_header_name'>" + appName + "</div><div class='fh_appform_header_section'> " + headerText + "</div>");
        }
    },

    updateCounts: function() {

        var forms_count = App.collections.forms.length;
        if (forms_count > 0) {
            $('#header_forms .badge').text(forms_count).show();
        } else {
            $('#header_forms .badge').hide();
        }

        var drafts_count = App.collections.drafts.length;
        if (drafts_count > 0) {
            $('#header_drafts .badge').text(drafts_count).show();
        } else {
            $('#header_drafts .badge').hide();
        }

        var pending_waiting_count = App.collections.pending_waiting.length;

        if (pending_waiting_count > 0) {
            $('#header_pending .badge').text(pending_waiting_count).show();
        } else {
            $('#header_pending .badge').hide();
        }

        var pending_queued_count = App.collections.pending_submitting.length;

        if (pending_queued_count > 0) {
            $('#header_queued .badge').text(pending_queued_count).show();
        } else {
            $('#header_queued .badge').hide();
        }

        var pending_review_count = App.collections.pending_review.length;

        if (pending_review_count > 0) {
            $('#header_review .badge').text(pending_review_count).show();
        } else {
            $('#header_review .badge').hide();
        }

        var sent_count = App.collections.sent.length;
        if (sent_count > 0) {
            $('#header_sent .badge').text(sent_count).show();
        } else {
            $('#header_sent .badge').hide();
        }

        console.log("Update Counts: ", forms_count, drafts_count, pending_waiting_count, pending_queued_count, pending_review_count, sent_count);
    }
});