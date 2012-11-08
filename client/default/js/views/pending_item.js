PendingItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'pending_submission',
  events: {
    'click button.delete-item': 'delete',
    'click button.submit-item': 'submit',
    'click': 'show'
  },

  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item">Delete</button><button class="button button-positive submit-item">Submit</button><span class="chevron"></span>',
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show', 'delete', 'submit');
    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  },

  delete: function(e) {
    e.stopPropagation();
    this.model.destroy();
  },

  submit: function() {
    console.log('submit form!');
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    App.views.form = new PendingView({
      model: this.model
    });
    App.views.form.render();
  }
});