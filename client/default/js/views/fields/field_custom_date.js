FieldCustomDateView = FieldView.extend({
  extension_type: 'fhdate',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="date">'
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
    this.$el.find('input[type="date"]').mobiscroll().date({theme:'android',display:'bottom',dateOrder : "ddmmyy"});
    this.show();
  },

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        if (val && !_.isEmpty(val)) {
          var formated = new moment(val,"DD-MM-YYYY").format("YYYY-MM-DD");
          $("#" + id).val(formated);
        }
      });
    }
    var val = $('#' + this.model.get('ID')).val();

    value = {};
    if(val !== "") {
      value[this.model.get('ID')] = new moment(val).format('DD-MM-YYYY');
    }
    return value;
  },

  action: function(el) {
    var ds = new moment().format('YYYY-MM-DD');
    $('input', this.$el).val(ds).blur();
    this.contentChanged();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.$el.find("label[class=error]").remove();
    this.$el.removeClass("error");
    this.$el.find(".error").removeClass("error");
  }


});