PendingListView = Backbone.View.extend({
  el: $('#fh_wufoo_pending'),

  templates: {
    pending_list: '<ul class="list inset pending_list"></ul>',
    pending_header: '<li class="list-divider">Pending Submissions</li>',
    in_progress_list: '<ul class="list inset in_progress_list"></ul>',
    in_progress_header: '<li class="list-divider">Submissions being submitted</li>',
    review_list: '<ul class="list inset review_list"></ul>',
    review_header: '<li class="list-divider">These submissions need to be reviewed</li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendPendingForm', 'changed');

    App.collections.pending.bind('add remove reset', this.changed, this);

    this.render();
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_pending');
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
    $(this.el).append(this.templates.pending_list);
    $('.pending_list', this.el).append(this.templates.pending_header);

    $(this.el).append(this.templates.in_progress_list);
    $('.in_progress_list', this.el).append(this.templates.in_progress_header);

    $(this.el).append(this.templates.review_list);
    $('.review_list', this.el).append(this.templates.review_header);

    _(App.collections.pending.models).each(function(form) {
      self.appendPendingForm(form);
    }, this);
  },

  appendPendingForm: function(form) {
    var view = new PendingItemView({
      model: form
    });
    $('.pending_list', this.el).append(view.render().el);
  }
});