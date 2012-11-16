FieldRadioView = FieldView.extend({
  templates: {
    hidden_field: '<input id="radio<%= id %>" type="hidden" value="">',
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>_<%= iteration %>" name="<%= id %>" type="radio" class="field radio" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>_<%= iteration %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var hidden_field = _.template(this.templates.hidden_field, {
      "id": this.model.get('ID')
    });
    this.$el.append(hidden_field);
    
    var choices = this.model.get('Choices');
    $.each(choices, function(i, choice) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": self.model.get('ID'),
        "iteration": i,
        "choice": choice.Label,
        "value": choice.Label
      }));
      if (i === 0) {
        choice_field.attr('checked', 'checked');
      }
      self.$el.append(choice_field);
    });

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addValidationRules: function () {
    // first radio is always initially checked, so no need to do 'required' validation on this field
  },

  value:function (value) {
    var self = this;
    if (value) {
      $.each(value, function (id, val) {
        $("input[value='" + val + "']").attr("checked", "checked");
      });
    }
    value = {};
    this.$el.find('input[type="radio"]:checked').each(function() {
      value[self.model.get('ID')] = $(this).val();
    });
    return value;
  }
});