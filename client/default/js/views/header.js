HeaderView = Backbone.View.extend({
    el: '#fh_appform_header',

    events: {
        'click #header_forms' : "showHome",
        'click #header_drafts': "showDrafts",
        'click #header_pending': "showPending",
        'click #header_sent': "showSent",
        'click #header_settings': "showSettings"
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

        var header = $(_.template($('#header-list').html(), {}));

        $(this.$el).append(header);
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

    hideMenu: function(){
        $('#forms-navbar-collapse').collapse('hide');
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
        window.scrollTo(0, 0);
        App.views.form_list.hide();
        App.views.drafts_list.hide();
        App.views.pending_list.hide();
        App.views.sent_list.hide();
        App.views.settings.hide();
        $('#fh_appform_content').hide();
        if (_.isObject(App.views.form)) {
            App.views.form.$el.hide();
            //App.views.form = null;
        }
    },

    markActive: function(tab_class) {
        var self = this;
        tab_class = tab_class ? tab_class : "";
        tab_class = "#" + tab_class;
        $('#forms-navbar-collapse li').removeClass('active');
        $(tab_class).addClass('active');
    },

    updateCounts: function() {
        var drafts_count = App.collections.drafts.length;
        if (drafts_count > 0) {
            $('#header_drafts .badge', this.$el).text(drafts_count).show();
        } else {
            $('#header_drafts .badge', this.$el).hide();
        }

        var pending_count = App.collections.pending_submitting.length + App.collections.pending_review.length + App.collections.pending_waiting.length;

        if (pending_count > 0) {
            $('#header_pending .badge', this.$el).text(pending_count).show();
        } else {
            $('#header_pending .badge', this.$el).hide();
        }

        var sent_count = App.collections.sent.length;
        if (sent_count > 0) {
            $('#header_sent .badge', this.$el).text(sent_count).show();
        } else {
            $('#header_sent .badge', this.$el).hide();
        }
    }
});