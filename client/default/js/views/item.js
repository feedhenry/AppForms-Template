ItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'pending_submission',
  events: {
    'click button.delete-item': 'delete',
    'click button.submit-item': 'submit',
    'click': 'show'
  },

  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Submit</button><span class="chevron"></span>'
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

  "delete": function(e) {
    e.stopPropagation();

    var confirmDelete = confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      this.model.destroy();
    }

    return false;
  },

  submit: function() {
    var self = this;
    var json = this.model.toJSON();
    delete json.id;
    //Delete the id, or it might not get re-created on failure
    App.collections.pending_submitting.create(json);
    this.model.destroy();
    return false;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    var draft = new DraftModel(this.model.toJSON());
    App.views.form = new DraftView({
      model: draft
    });
    App.views.form.render();
  }
});