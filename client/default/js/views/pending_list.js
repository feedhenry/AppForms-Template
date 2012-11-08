PendingListView = Backbone.View.extend({
  el: $('#fh_wufoo_pending'),

  templates: {
    pending_submitted_list: '<ul class="list inset pending_submitted_list"></ul>',
    pending_submitted_header: '<li class="list-divider">Submitted Forms</li>',
    pending_submitting_list: '<ul class="list inset pending_submitting_list"></ul>',
    pending_submitting_header: '<li class="list-divider">Forms being submitted<img src="img/loading.gif" class="loading" alt=""/></li>',
    pending_review_list: '<ul class="list inset pending_review_list"></ul>',
    pending_review_header: '<li class="list-divider">These submissions need to be reviewed</li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSubmittingForm', 'changed');

    App.collections.pending_submitting.bind('add remove reset', this.changed, this);
    App.collections.pending_submitted.bind('add remove reset', this.changed, this);
    App.collections.pending_review.bind('add remove reset', this.changed, this);

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
    $(this.el).append(this.templates.pending_submitting_list);
    $('.pending_submitting_list', this.el).append(this.templates.pending_submitting_header);

    $(this.el).append(this.templates.pending_review_list);
    $('.pending_review_list', this.el).append(this.templates.pending_review_header);

    $(this.el).append(this.templates.pending_submitted_list);
    $('.pending_submitted_list', this.el).append(this.templates.pending_submitted_header);

    _(App.collections.pending_submitting.models).each(function(form) {
      self.appendSubmittingForm(form);
    }, this);

    _(App.collections.pending_submitted.models).each(function(form) {
      self.appendSubmittedForm(form);
    }, this);

    _(App.collections.pending_review.models).each(function(form) {
      self.appendReviewForm(form);
    }, this);
  },

  appendSubmittingForm: function(form) {
    var view = new PendingItemView({
      model: form
    });
    $('.pending_submitting_list', this.el).append(view.render().el);
  },

  appendSubmittedForm: function(form) {
    var view = new PendingSubmittedItemView({
      model: form
    });
    $('.pending_submitted_list', this.el).append(view.render().el);
  },

  appendReviewForm: function(form) {
    var view = new PendingItemView({
      model: form
    });
    $('.pending_review_list', this.el).append(view.render().el);
  }
});