ShowFormButtonView = Backbone.View.extend({
    events: {
        'click button.show.fetched': 'show',
        'click button.show.fetch_error': 'fetch'
    },

    templates: {
        form_button: '<button class="show btn btn-primary col-xs-12 text-center <%= enabledClass %> <%= dataClass %> fh_appform_button_action"><%= name %></button>'
    },

    initialize: function() {
        _.bindAll(this, 'render', 'unrender', 'show', 'fetch');

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'remove', this.unrender);
    },

    render: function() {
        var html;

        var name = this.model.get("name") || "";
        var formattedName = name;

        var fullyLoaded = this.model.get('fh_full_data_loaded');
        var errorLoading = this.model.get('fh_error_loading');
        var enabled = fullyLoaded || !errorLoading;
        html = _.template(this.templates.form_button)({
            name: formattedName,
            enabledClass: enabled ? 'button-main' : '',
            dataClass: errorLoading ? 'fetch_error' : fullyLoaded ? 'fetched' : 'fetching'
        });

        this.$el.html(html);
        this.$el.find('button').not('.fh_full_data_loaded');

        return this;
    },

    unrender: function() {
        $(this.$el).remove();
    },

    show: function() {
        App.views.header.hideAll();
        App.views.form = new FormView({
            "parentEl": $("#fh_appform_content"),
            "form": this.model.coreModel,
            "autoShow": true
        });

    },

    fetch: function() {
        // show loading view
        var loadingView = new LoadingView(this.model);
        loadingView.show('Syncing form');
        this.model.fetch();
    }
});