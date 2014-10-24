SentListView = SubmissionListview.extend({
    el: $('#fh_content_sent'),

    events: {
        
    },

    templates: {
        dismiss_all: '<button class="col-xs-12 btn btn-danger fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button>',
        save_max: '<label for="sentSaveMax" class="col-xs-6 fh_appform_field_title">Number of sent items to keep</label><select class="fh_appform_field_input form-control col-xs-6" id="sentSaveMax"><%= options%></select>'
    },

    initialize: function() {
        _.bindAll(this, 'render', 'changed');

        this.listenTo(App.collections.sent, 'add remove reset sync',  this.changed);

        this.render();
    },
    render: function() {

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html())());
        return this;
    },

    show: function() {
        App.views.header.markActive('header_sent', "Sent");
        this.changed();
        $(this.$el).show();
    },

    

    hide: function() {
        $(this.$el).hide();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        $(this.$el).append(_.template($('#forms-logo').html())());

        self.renderGroup(App.collections.sent);
    },
    appendFunction: function(form, formId) {
        this.appendItemView(form, formId, PendingSubmittedItemView);
    }
});