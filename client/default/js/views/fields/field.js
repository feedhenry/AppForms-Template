FieldView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.append(_.template(this.template.join(''), {
      "id": this.options.field.ID,
      "title": this.options.field.Title
    }));
    if (this.options.field.IsRequired === '1') {
      this.$el.find('#' + this.options.field.ID).rules("add", {
        "required": true
      });
    }
  }
});