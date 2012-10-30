FieldCustomDateView = FieldView.extend({
  extension_type: 'fhtime',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text">'
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Date');

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  action: function(el) {
    var ds = new moment().format('DD/MM/YYYY');
    $('input', this.$el).val(ds).blur();
  }
});