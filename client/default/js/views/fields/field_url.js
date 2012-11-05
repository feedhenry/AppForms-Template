FieldUrlView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="url">'],

  addValidationRules: function () {
    var input = this.$el.find('#' + this.model.get('ID'));
    input.rules('add', {
      "url": true
    });
    if (this.isRequired()) {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }
  }
});