FieldNumberView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  addRules: function () {
    // call super
    FieldView.prototype.addRules.call(this);

    // make sure value is a number
    this.$el.find('#' + this.model.get('ID')).rules("add", {
      "number": true
    });
  }
});