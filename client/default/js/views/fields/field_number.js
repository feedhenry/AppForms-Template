FieldNumberView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  render: function () {
    FieldView.prototype.render.call(this);

    this.$el.find('#' + this.model.get('ID')).rules("add", {
      "number": true
    });
  }
});