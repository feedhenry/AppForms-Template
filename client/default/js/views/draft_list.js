DraftListView = SubmissionListview.extend({
    el: $('#fh_content_drafts'),

    templates: {
    },

    initialize: function() {
        _.bindAll(this, 'render', 'changed');

        this.listenTo(App.collections.drafts, 'add remove reset sync', this.changed);

        this.render();
    },
    render: function(){
        // Empty our existing view
        $(this.$el).empty();
        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html())());
    },

    show: function() {
        App.views.header.markActive('header_drafts', "Drafts");
        $(this.$el).show();
    },

    hide: function() {
        $(this.$el).hide();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html()));

        self.renderGroup(App.collections.drafts);
    },

    appendFunction: function(form, formId) {
        this.appendItemView(form, formId, DraftItemView);
    }
});