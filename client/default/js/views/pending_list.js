PendingListView = Backbone.View.extend({
  el: $('#fh_wufoo_pending_list'),

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<h2>Pending Submissions</h2><h4>Below are your pending submissions</h4>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm', 'changed');

    App.collections.pending.bind('add remove reset', this.changed, this);

    this.render();
  },

  show: function () {
    App.views.header.markActive('.fh_wufoo_pending');
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

    _(App.collections.pending.models).each(function(form) {
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