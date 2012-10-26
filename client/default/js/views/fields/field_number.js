FieldNumberView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  addRequiredRule: function () {
    // call super
    FieldView.prototype.addRequiredRule.call(this);

    // make sure value is a number
    this.$el.find('#' + this.model.get('ID')).rules("add", {
      "number": true
    });
  }
});