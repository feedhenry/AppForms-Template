ReviewListView = SubmissionListview.extend({
    el: $('#fh_content_review'),

    events: {
    },

    templates: {
    },

    initialize: function() {
        _.bindAll(this, 'render', 'changed');

        this.listenTo(App.collections.pending_review, 'change add remove reset sync', this.changed);

        this.render();
    },
    render: function(){

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html())());
    },

    scrollToTop: function() {
        window.scrollTo(0, 0);
    },

    hide: function() {
        $(this.$el).hide();
    },

    show: function() {
        App.views.header.markActive('header_review', "Review");
        $(this.$el).show();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html())( {}));

        var empty = App.collections.pending_review.models.length === 0;

        self.renderGroup(App.collections.pending_review);
    },
    appendFunction: function(form, formId) {
        this.appendItemView(form, formId, PendingReviewItemView);
    }
});