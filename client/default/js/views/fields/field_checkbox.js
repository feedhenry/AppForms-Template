$.validator.addMethod("wufoo_checkbox_required", function(value, element, params) {
  // TODO: implement
  return false;
});

FieldCheckboxView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" name="<%= id %>" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": subfield.ID,
        "iteration": i,
        "choice": subfield.Label,
        "value": subfield.Label
      }));
      self.$el.append(choice_field);
    });

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
  }
});
