FieldView = Backbone.View.extend({

  className: 'field_container',
  templates: {
    instructions: '<p class="instruct"><%= instructions %></p>'
  },

  events: {
    "change": "contentChanged"
  },

  // TODO: cache the input element lookup?
  initialize: function() {
    var nonFhClasses = this.model.getNonFhClasses();
    if (nonFhClasses) {
      this.$el.addClass(nonFhClasses);
    }

    this.on('visible', function () {
      console.log('field visible');
    });

    if(!this.model.serialize() && !_.isEmpty(this.defaultValue())) {
      this.model.set({
        Value: this.defaultValue()
      });
    }

    if (this.model.get('IsRequired') === '1') {
      this.$el.addClass('required');
    }

    // only call render once. model will never update
    this.render();
  },

  contentChanged: function(e) {
    console.log("Value changed :: " + JSON.stringify(this.value()));
    this.model.set({
      Value: this.value()
    });
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title'),
      "defaultVal": this.model.get('DefaultVal') || ''
    }));

    var instructions = this.model.get('Instructions');

    if (instructions && instructions !== '') {
      $('label:first', this.el).after(_.template(this.templates.instructions, {
        instructions: this.model.get('Instructions')
      }));
    }

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addRules: function() {
    this.addValidationRules();
    this.addSpecialRules();
  },

  isRequired: function() {
    return this.model.get('IsRequired') === '1';
  },

  addValidationRules: function() {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }
  },

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
    _(this.model.get('Rules') || []).each(function(rule) {
      var ruleConfig = _.clone(rule);
      ruleConfig.pageView = self.options.parentView;
      ruleConfig.fn = rules[rule.Type];
      self.$el.find('#' + self.model.get('ID')).wufoo_rules('add', ruleConfig);
    });
  },

  removeRules: function() {
    this.$el.find('#' + this.model.get('ID')).rules('remove');
  },

  hide: function() {
    if (this.$el.is(':visible')) {
      this.$el.hide();
      // remove rules too
      this.removeRules();
    }
  },

  addButton: function(input, extension_type, label) {
    var self = this;
    var button = $('<button>');
    button.addClass('special_button');
    button.addClass(extension_type);
    button.text(' ' + label);
    var img = $('<img>');
    img.attr('src', './img/' + extension_type + '.png');
    img.css('height', '28px');
    img.css('width', '28px');
    button.prepend(img);

    button.click(function(e) {
      self.action(this);
      e.preventDefault();
      return false;
    });

    input.append(button);
    return button;
  },

  show: function() {
    if (!this.$el.is(':visible')) {
      this.$el.show();
      // add rules too
      this.addRules();
      //set the form value from model
      this.value(this.model.serialize());
    }
  },

  defaultValue: function() {
    var defaultValue = {};
    defaultValue[this.model.get('ID')] = this.model.get('DefaultVal');
    return defaultValue;
  },

  // Gets or Set the value for this field
  // value should always be the serialized form value i.e {Field1 : "Test"}
  // field with sub fields - {{Field1 : "First Name"}, {Field2 : "Second Name"}}
  // More complex fields such as files may have value overridden
  // file - {Field2 : {filebase64 : "sssss", filename : "test.txt", content_type : "text/plain"}}
  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        $("#" + id).val(val);
      });
    }
    value = {};
    this.$el.find('input, select, textarea').each(function() {
      value[$(this).attr('id')] = $(this).val();
    });
    return value;
  }
});