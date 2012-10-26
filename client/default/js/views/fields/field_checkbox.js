FieldCheckboxView = FieldView.extend({
  // addRules: function () {
  //   // don't call super fn as checkboxes either
  //   // - must be checked if only 1 option
  //   // - at least one checked if more than one option

  //   // TODO: implement rule based on # of checkboxes
  // }
  // 

  templates: {
    hidden_field: '<input id="checkbox<%= id %>" name="<%= id %>" type="hidden" value="">',
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" name="<%= id %>" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var hidden_field = _.template(this.templates.hidden_field, {
      "id": this.model.get('ID')
    });
    this.$el.append(hidden_field);

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

    // add to form
    this.options.formEl.append(this.$el);

    this.show();
  },

  addValidationRules: function () {
    // TODO:
  }
});
