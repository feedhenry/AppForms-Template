FieldGeoView = FieldView.extend({
  extension_type: 'fhgeo',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text" disabled>'
  },
  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible',this.clearError);
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

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.clearError();
  },

  action: function(el) {
    var self = this;
    var ds = new moment().format('YYYY-MM-DD');
    var input = $('input', this.$el);

    navigator.geolocation.getCurrentPosition(function(res) {
      var location = '(' + res.coords.latitude + ', ' + res.coords.longitude + ')';
      input.val(location);
      self.contentChanged();
    }, function(msg, err) {
      input.attr('placeholder','Location could not be determined');
    });
    input.blur();
  }
});