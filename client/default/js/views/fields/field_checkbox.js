FieldCheckboxView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" name="<%= mainId %>[]" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
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
        "mainId": self.model.get('ID'),
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
      this.$el.find('[name="' + this.model.get('ID') + '[]"]').first().rules('add', {
        "required": true,
        "minlength": 1,
        messages: {
          required: "Please choose at least 1"
         }
      });
    }
  },

  defaultValue:function () {
    var defaultValue = {};
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      if(subfield.DefaultVal && subfield.DefaultVal == 1) {
        defaultValue[subfield.ID] = subfield.Label;
      }
    });
    return defaultValue;
  },

  value:function (value) {
    if (value) {
      $.each(value, function (id, val) {
        $("input[value='" + val + "']").attr("checked", "checked");
      });
    }
    value = {};
    this.$el.find('input[type="checkbox"]:checked').each(function() {
      value[$(this).attr('id')] = $(this).val();
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

    // also apply any special rules
    _(this.model.get('Rules') || []).each(function(rule, index) {
      var value  = rule.condition ? rule.condition.Value : null;
      var field;
      if(value) {
        field = $("input[type=checkbox][value= '" + value +"']", this.$el);
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
    var fields = $("input[type=checkbox]", this.$el);
    _.each(fields, function(field){field.rules('remove');});
  },

  checkRules: function () {
    var checked = $('input[type=checkbox]:checked', this.$el);
    checked.click();
    checked.click();
  }


});
