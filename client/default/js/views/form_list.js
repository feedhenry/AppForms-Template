var FormListView = Backbone.View.extend({
    el: $('#fh_content_form_list'),

    events: {
        'click .settings': 'showSettings',
        'click button.reload': 'reload'
    },

    templates: {
        list: '<div id="fh_appform_form_list" class="col-xs-12"></div>',
        header: '<h4 class="col-xs-12 text-center">Choose a form.</h4>',
        error: '<button class="reload btn col-xs-12 fh_appform_button_cancel <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button>'
    },

    initialize: function() {
        _.bindAll(this, 'render', 'appendForm');
        this.views = [];

        this.listenTo(App.collections.forms, 'reset', function(collection, options) {
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
        App.views.header.markActive('header_forms', "Forms");
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
        var html = _.template(this.templates.error)( {
            name: msg + "<br/>Please Retry Later",
            enabledClass: 'button-danger fh_appform_button_cancel',
            dataClass: 'fetched'
        });
        this.$el.append(html);
    },

    render: function() {
        // Empty our existing view
        $(this.$el).empty();

        
        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html())());
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