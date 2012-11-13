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
    save_max: '<li><label for="sentSaveMax" class="sentSaveMaxLabel">Number of sent items to keep</label><select id="sentSaveMax"><option>5</option><option>10</option><option>15</option><option>20</option><option>25</option></select></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSentForm', 'changed');

    App.collections.sent.bind('add remove reset', this.changed, this);

    this.render();
  },

  saveMaxSelected: function() {
    var saveMax = $('#sentSaveMax', this.el).val();
    console.log('saveMax:' + saveMax);
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_sent');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  dismissAll: function(e) {    
    var all = [];

    _(App.collections.sent.models).forEach(function(model){
      all.push(model);
    });

    _(all).forEach(function(model){
      model.destroy();  
    });
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
  },

  appendSentForm: function(form) {
    var view = new PendingSubmittedItemView({
      model: form
    });
    $('.sent_list', this.el).append(view.render().el);
  }
});