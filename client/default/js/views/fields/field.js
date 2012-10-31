FieldView = Backbone.View.extend({

  className : 'field_container',

  // TODO: cache the input element lookup?
  initialize: function() {
    // only call render once. model will never update
    this.render();
  },

  render: function() {
    // construct field html
    this.$el.addClass('field_container').append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  },

  addRules: function () {
    this.addValidationRules();
    this.addSpecialRules();
  },

  addValidationRules: function () {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }
  },

  addSpecialRules: function () {
    var self = this;

    // also apply any special rules
    _(this.model.get('Rules') || []).each(function (rule) {
      rule.pageView = self.options.parentView;
      var ruleConfig = {};
      ruleConfig[rule.Type] = rule;
      self.$el.find('#' + self.model.get('ID')).wufoo_rules('add', ruleConfig);
    });
  },

  removeRules: function () {
    this.$el.find('#' + this.model.get('ID')).rules('remove');
  },

  hide: function () {
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
    button.prepend(img);

    button.click(function() {
      self.action(this);
      return false;
    });

    input.append(button);
  },

  show: function () {
    if (!this.$el.is(':visible')) {
      this.$el.show();
      // add rules too
      this.addRules();
    }
  }
});