HeaderView = Backbone.View.extend({
    el: '#fh_wufoo_header',

    events: {},

    templates: {
        nav_bar: '<div class="col-xs-12 navbar fh_appform_button_bar navbar-fixed-top" role="navigation"></div>',
        list: '<div class="row" id="fh_appform_tabbs"></div>',
        forms_button: '<div class="col-xs-3 text-center fh_appform_button_action">Forms</div>',
        drafts_button: '<div class="col-xs-3 text-center fh_appform_button_action">Drafts</div>',
        pending_button: '<div class="col-xs-3 text-center fh_appform_button_action">Pending</div>',
        sent_button: '<div class="col-xs-3 text-center fh_appform_button_action">Sent<span class="badge pull-right count"></div>'
    },

    initialize: function() {
        this.undelegateEvents();
        _.bindAll(this, 'render', 'advise', 'adviseAll', 'showHome', 'showDrafts', 'showPending', 'updateCounts');

        App.collections.drafts.bind('add remove reset', this.updateCounts, this);
        App.collections.pending_submitting.bind('add remove reset', this.updateCounts, this);
        App.collections.pending_review.bind('add remove reset', this.updateCounts, this);
        App.collections.pending_waiting.bind('add remove reset', this.updateCounts, this);
        App.collections.sent.bind('add remove reset', this.updateCounts, this);

        var self = this;
        this.adviseAll();
        this.render();
    },

    render: function() {
        var self = this;
        $(this.$el).empty();

        var list = $(_.template(this.templates.list, {}));
        var forms_button = $(this.templates.forms_button);
        var drafts_button = $(this.templates.drafts_button);
        var pending_button = $(this.templates.pending_button);
        var sent_button = $(this.templates.sent_button);
        var nav_bar = $(this.templates.nav_bar);

        list.append(forms_button);
        list.append(drafts_button);
        list.append(pending_button);
        list.append(sent_button);

        forms_button.click(function(e) {
            e.preventDefault();
            self.showHome();
            console.log("Forms Button Clicked ");
        });

        drafts_button.click(function(e) {
            e.preventDefault();
            self.showDrafts();
            console.log("drafts_button Button Clicked ");
        });

        pending_button.click(function(e) {
            e.preventDefault();
            self.showPending();
            console.log("pending_button Button Clicked ");
        });

        sent_button.click(function(e) {
            e.preventDefault();
            self.showSent();
            console.log("sent_button Button Clicked ");
        });

        nav_bar.append(list);

        $(this.$el).append(nav_bar);
        $(this.$el).show();
    },
    adviseAll: function() {
        this.showHome = this.advise(this.showHome);
        this.showDrafts = this.advise(this.showDrafts);
        this.showPending = this.advise(this.showPending);
        this.showSent = this.advise(this.showSent);
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
                var confirmDelete = confirm('It looks like you have unsaved data -- if you leave before submitting your changes will be lost. Continue?');
                if (confirmDelete) {
                    return proceed(true);
                } else {
                    return false;
                }
            }
        };
    },

    showHome: function() {
        console.log("showHome");
        this.hideAll();
        App.views.form_list.show();
        return false;
    },

    showDrafts: function() {
        this.hideAll();
        App.views.drafts_list.show();
        return false;
    },

    showPending: function() {
        this.hideAll();
        App.views.pending_list.show();
        return false;
    },

    showSent: function() {
        this.hideAll();
        App.views.sent_list.show();
        return false;
    },

    showSettings: function() {
        this.hideAll();
        App.views.settings.show();
    },
    hideAll: function() {
        window.scrollTo(0, 0);
        App.views.form_list.hide();
        App.views.drafts_list.hide();
        App.views.pending_list.hide();
        App.views.sent_list.hide();
        App.views.settings.hide();
        $('#fh_wufoo_content').hide();
        if (_.isObject(App.views.form)) {
            App.views.form.$el.hide();
            //App.views.form = null;
        }
    },

    markActive: function(tab_class) {
        var self = this;
        tab_class = tab_class ? tab_class : "";
        tab_class = "#tab_" + tab_class;
        $('#fh_appform_tabbs li button').removeClass('active');
        $(tab_class).addClass('active');
    },

    updateCounts: function() {
        var drafts_count = App.collections.drafts.length;
        if (drafts_count > 0) {
            $('#tab_fh_content_drafts .count', this.$el).text(drafts_count).show();
        } else {
            $('#tab_fh_content_drafts .count', this.$el).hide();
        }

        var pending_count = App.collections.pending_submitting.length + App.collections.pending_review.length + App.collections.pending_waiting.length;

        if (pending_count > 0) {
            $('#tab_fh_content_pending .count', this.$el).text(pending_count).show();
        } else {
            $('#tab_fh_content_pending .count', this.$el).hide();
        }

        var sent_count = App.collections.sent.length;
        if (sent_count > 0) {
            $('#tab_fh_content_sent .count', this.$el).text(sent_count).show();
        } else {
            $('#tab_fh_content_sent .count', this.$el).hide();
        }
    }
});