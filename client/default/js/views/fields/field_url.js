FieldUrlView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="url">'],

  addValidationRules: function () {
    // call super
    FieldView.prototype.addValidationRules.call(this);

    // url validation
    this.$el.find('#' + this.model.get('ID')).rules('add', {
      "url": true
    });
  }
});