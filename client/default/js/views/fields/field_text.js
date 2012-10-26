FieldTextView = FieldView.extend({
  template: ['<label class="desc" for="<%= id %>"><%= title %></label>',
              '<input class="field text medium" id="<%= id %>" name="<%= id %>" type="text">'],

  render: function() {
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));
    // add to dom
    this.options.formEl.append(this.$el);
    this.show();
  },

});