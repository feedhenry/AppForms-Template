SentListView = Backbone.View.extend({
  el: $('#fh_wufoo_sent'),

  events: {
    'click button.dismiss-all': 'dismissAll',
    "change #sentSaveMax": "saveMaxSelected"
  },

  templates: {
    sent_list: '<ul class="list inset sent_list"></ul>',
    sent_header: '<li class="list-divider">Sent Submissions</li>',
    dismiss_all: '<li><button class="dismiss-all button button-main button-block">Dismiss All</button></li>',
    save_max: '<li><label for="sentSaveMax" class="sentSaveMaxLabel">Number of sent items to keep</label><select id="sentSaveMax"><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option></select></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSentForm', 'changed');

    App.collections.sent.bind('add remove reset', this.changed, this);

    this.render();
  },

  saveMaxSelected: function() {
    var saveMax = parseInt($('#sentSaveMax', this.el).val(), 10);
    if (_.isNumber(saveMax)) {
      App.config.set(_.extend({}, App.config.attributes, {
        "sent_save_max": saveMax
      }));
      App.collections.sent.checkSize();
    }
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_sent');
    this.populate();
    $(this.el).show();
  },

  populate: function() {
    // Re-render save
    var maxSize = App.config.get('sent_save_max') || App.config.get('default_sent_save_max');
    $('#sentSaveMax', this.el).val(maxSize);
  },

  hide: function() {
    $(this.el).hide();
  },

  dismissAll: function(e) {
    e.stopPropagation();

    var confirmDismiss = confirm("Are you sure you want to dismiss all submissions?");
    if (confirmDismiss) {
      var all = [];

      _(App.collections.sent.models).forEach(function(model) {
        all.push(model);
      });

      _(all).forEach(function(model) {
        model.destroy();
      });
    }

    return false;
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.sent_list);
    $('.sent_list', this.el).append(this.templates.sent_header);

    _(App.collections.sent.models).each(function(form) {
      self.appendSentForm(form);
    }, this);

    $('.sent_list', this.el).append(this.templates.dismiss_all);
    $('.sent_list', this.el).append(this.templates.save_max);

    this.populate();
  },

  appendSentForm: function(form) {
    var view = new PendingSubmittedItemView({
      model: form
    });
    $('.sent_list', this.el).append(view.render().el);
  }
});