FieldShortnameView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    input: '<span class="fancy_name"><input id="<%= id %>" name="<%= id %>" type="text" class="field text" value="<%= value %>"/><label for="<%= id %>"><%= label %></label></span>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.input, {
        "id": subfield.ID,
        "label": subfield.Label,
        "value": subfield.DefaultVal
      }));

      self.$el.append(choice_field);
    });

    var br = $('<br>').css('clear', 'left');
    self.$el.append(br);

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  },
  
  addValidationRules: function () {
    if (this.model.get('IsRequired') === '1') {
      // special required rule for checkbox fields
      this.$el.find('input[type="checkbox"]').rules('add', {
        "wufoo_checkbox_required": true
      });
    }
  },

  serialize: function() {
    var serialized_field = {};
    this.$el.find('input').each(function() {
      serialized_field[$(this).attr('id')] = $(this).val();
    });
    return serialized_field;
  }
});