FieldGeoView = FieldView.extend({
  extension_type: 'fhgeo',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text" disabled>'
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Location (Lat/Lon)');

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  action: function(el) {
    var ds = new moment().format('YYYY-MM-DD');
    var input = $('input', this.$el);

    $fh.geo(function(res) {
      var location = '(' + res.lat + ', ' + res.lon + ')';
      input.val(location);
    }, function(msg, err) {
      input.val('Location could not be determined');
    });
    input.blur();
    this.contentChanged();
  }
});