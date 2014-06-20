var FormListView = Backbone.View.extend({
    el: $('#fh_content_form_list'),

    events: {
        'click .settings': 'showSettings',
        'click button.reload': 'reload'
    },

    templates: {
        list: '<div id="fh_appform_form_list" class="col-xs-12"></div>',
        header: '<h1 class="col-xs-12 text-center">Your Forms</h1><h2 class="col-xs-12 text-center">Choose a form from the list below</h2>',
        error: '<button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button>',
        logo: '<div class="fh_appform_logo_container  col-xs-12"><div class="fh_appform_logo  col-xs-12"></div></div>'
    },

    initialize: function() {
        _.bindAll(this, 'render', 'appendForm');
        this.views = [];

        App.collections.forms.bind('reset', function(collection, options) {
            if (options == null || !options.noFetch) {
                App.collections.forms.each(function(form) {
                    form.fetch();
                });
            }
        });
    },

    reload: function() {
        var loadingView = new LoadingCollectionView();
        loadingView.show("Attempting to reload forms");
        App.router.reload();
    },

    show: function() {
        App.views.header.markActive('header_forms');
        this.render();
        $(this.$el).show();
    },

    hide: function() {
        $(this.$el).hide();
    },

    renderErrorHandler: function(msg) {
        try {
            if (msg == null || msg.match("error_ajaxfail")) {
                msg = "An unexpected error occurred.";
            }
        } catch (e) {
            msg = "An unexpected error occurred.";
        }
        var html = _.template(this.templates.error, {
            name: msg + "<br/>Please Retry Later",
            enabledClass: 'button-negative',
            dataClass: 'fetched'
        });
        $('ul', this.$el).append(html);

    },

    render: function() {
        // Empty our existing view
        $(this.$el).empty();

        // Add logo
        $(this.$el).append(this.templates.logo);

        // Add list
        $(this.$el).append(this.templates.list);

        if (App.collections.forms.models.length) {
            // Add header
            $('#fh_appform_form_list', this.$el).append(this.templates.header);
            _(App.collections.forms.models).forEach(function(form) {
                this.appendForm(form);
            }, this);
        } else if (App.collections.forms.models.length === 0) {
            this.renderErrorHandler("No forms exist for this app.");
        } else {
            this.renderErrorHandler(arguments[1]);
        }
    },

    appendForm: function(form) {
        var view = new ShowFormButtonView({
            model: form
        });
        this.views.push(view);
        $('#fh_appform_form_list', this.$el).append(view.render().$el);
    },

    showSettings: function() {
        App.views.header.showSettings();
    },

    showAbout: function() {
        App.views.header.showAbout();
    }
});