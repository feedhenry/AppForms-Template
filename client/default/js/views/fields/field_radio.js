FieldRadioView = FieldView.extend({
  templates: {
    hidden_field: '<input id="radio<%= id %>" type="hidden" value="" data-type="radio">',
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
    // ensure that the field has a value, otherwise
    // submission will fail on a required radio with the default field as the first field
    this.model.set({Value: this.value()});
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
  } ,
  addSpecialRules: function() {
    var self = this;

    var rules = {
      'Show': function(rulePasses, params) {
        var fieldId = 'Field' + params.Setting.FieldName;
        if (rulePasses) {
          App.views.form.showField(fieldId);
        } else {
          App.views.form.hideField(fieldId);
        }
      },
      'Hide': function(rulePasses, params) {
        var fieldId = 'Field' + params.Setting.FieldName;
        if (rulePasses) {
          App.views.form.hideField(fieldId);
        } else {
          App.views.form.showField(fieldId);
        }
      }
    };

    _(this.model.get('Rules') || []).each(function(rule, index) {
      var value  = rule.condition ? rule.condition.Value : null;
      var field;
      if(value) {
        field = $("input[type=radio][value= '" + value +"']", this.$el);
      }
      if(field) {
        var ruleConfig = _.clone(rule);
        ruleConfig.pageView = self.options.parentView;
        ruleConfig.fn = rules[rule.Type];
        $(field).wufoo_rules('add', ruleConfig);
      }
    });
  },

  removeRules: function() {
    // also apply any special rules
    _(this.model.get('Rules') || []).each(function(rule, index) {
        var value  = rule.condition ? rule.condition.Value : null;
        var field;
        if(value) {
          field = $("input[type=radio][value= '" + value +"']", this.$el);
        }
        if(field) {
          field.rules('remove');
        }
    });
  },

  checkRules: function () {
    $("input[type=radio]:checked", this.$el).click();
  }

});