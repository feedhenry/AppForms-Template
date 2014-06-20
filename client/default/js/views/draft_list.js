DraftListView = Backbone.View.extend({
    el: $('#fh_content_drafts'),

    templates: {
    },

    initialize: function() {
        _.bindAll(this, 'render', 'appendDraftForm', 'changed');

        App.collections.drafts.bind('add remove reset sync', this.changed, this);

        this.render();
    },

    show: function() {
        App.views.header.markActive('header_drafts');
        $(this.$el).show();
    },

    hide: function() {
        $(this.$el).hide();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();
        // Add lists
        var template = _.template($('#draft-list').html(), {title: "Drafts"});

        $(this.$el).append(template);
        _(App.collections.drafts.models).each(function(form) {
            self.appendDraftForm(form);
        }, this);
    },

    appendDraftForm: function(form) {
        var view = new DraftItemView({
            model: form
        });
        $('#drafts-list-Drafts', this.$el).append(view.render().$el);
    }
});