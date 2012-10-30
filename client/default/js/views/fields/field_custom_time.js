FieldCustomTimeView = FieldView.extend({
  extension_type: 'fhtime',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="time">'
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Time');

    // add to dom
    this.options.formEl.append(this.$el);
    this.show();
  },

  action: function(el) {
    var ts = new moment().format('HH:mm:ss');
    $('input', this.$el).val(ts).blur();
  }
});