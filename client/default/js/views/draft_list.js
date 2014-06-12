DraftListView = Backbone.View.extend({
    el: $('#fh_content_drafts'),

    templates: {
        draft_list: '<div class="table-responsive col-xs-12 text-center"><table class="fh_appform_field_area list inset draft_list table table-bordered"><tr><th colspan="4"><h2 class="text-center">Draft Submissions<h2></th></tr><tr><th class="text-center">Form Name</th class="text-center"><th class="text-center">Form Id</th><th class="text-center">Saved At</th><th class="text-center">Actions</th></tr></table></div>',
        draft_header: ''
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
        $(this.$el).append(this.templates.draft_header);

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