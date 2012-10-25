FieldNumberView = Backbone.View.extend({

  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.append(_.template(this.template.join(''), {
      "id": this.options.field.ID,
      "title": this.options.field.Title
    }));
  }
});