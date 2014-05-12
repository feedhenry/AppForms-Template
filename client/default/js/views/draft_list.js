DraftListView = Backbone.View.extend({
  el: $('#fh_appform_drafts'),

  templates: {
    draft_list: '<ul class="fh_appform_field_area list inset draft_list"></ul>',
    draft_header: '<li class="list-divider"><div class="fh_appform_field_title">Draft Submissions</div></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendDraftForm', 'changed');

    App.collections.drafts.bind('add remove reset', this.changed, this);

    this.render();
  },

  show: function() {
    App.views.header.markActive('.fh_appform_drafts');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.draft_list);
    $('.draft_list', this.el).append(this.templates.draft_header);

    _(App.collections.drafts.models).each(function(form) {
      self.appendDraftForm(form);
    }, this);
  },

  appendDraftForm: function(form) {
    var view = new DraftItemView({
      model: form
    });
    $('.draft_list', this.el).append(view.render().el);
  }
});