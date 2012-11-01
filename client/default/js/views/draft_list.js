DraftListView = Backbone.View.extend({
  el: $('#fh_wufoo_drafts_list'),

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<h2>Drafts</h2><h4>Choose a draft from the list below</h4>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm', 'changed');

    App.collections.drafts.bind('add remove reset', this.changed, this);

    this.render();
  },

  show: function () {
    App.views.header.markActive('.fh_wufoo_drafts');
    $(this.el).show();
  },

  hide: function () {
    $(this.el).hide();
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add list
    $(this.el).append(this.templates.list);

    // Add header
    $('ul', this.el).append(this.templates.header);

    _(App.collections.drafts.models).each(function(form) {
      self.appendForm(form);
    }, this);
  },

  appendForm: function(form) {
    var view = new ShowFormButtonView({
      model: form
    });
    $('ul', this.el).append(view.render().el);
  }
});