FieldEmailView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="email">'],

  addValidationRules: function () {
    // call super
    FieldView.prototype.addValidationRules.call(this);

    // email validation
    this.$el.find('#' + this.model.get('ID')).rules('add', {
      "email": true
    });
  }
});