FieldRadioView = FieldView.extend({
  templates: {
    hidden_field: '<input id="radio<%= id %>" name="<%= id %>" type="hidden" value="">',
    choice: '<input id="<%= id %>_<%= iteration %>" name="<%= id %>" type="radio" class="field radio" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>_<%= iteration %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var hidden_field = _.template(this.templates.hidden_field, {
      "id": this.model.get('ID')
    });
    this.$el.append(hidden_field);

    var choices = this.model.get('Choices');
    $.each(choices, function(i, choice) {
      var choice_field = _.template(self.templates.choice, {
        "id": self.model.get('ID'),
        "iteration": i,
        "choice": choice.Label,
        "value": choice.Label
      });
      self.$el.append(choice_field);
    });

    // add to form
    this.options.formEl.append(this.$el);

    this.show();
  },
});