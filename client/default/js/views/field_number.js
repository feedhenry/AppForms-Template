FieldNumberView = Backbone.View.extend({

  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  initialize: function(opts) {
    this.el = opts.form[0];
    this.field = opts.field;

    this.render();
  },

  render: function() {
    $(this.el).append(_.template(this.template.join(''), {
      "id": this.field.ID,
      "title": this.field.Title
    }));
  }
});