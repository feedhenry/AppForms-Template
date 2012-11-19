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
    this.options.parentEl.append(this.$el);
    this.show();
  },

  action: function(el) {
    var m = new moment();
    $('input', this.$el).val(m.format('HH:mm:ss')).blur();
    if($('input', this.$el).val() === "") {
      $('input', this.$el).val(m.format('HH:mm:00')).blur();
    }
    this.contentChanged();
  }
});
