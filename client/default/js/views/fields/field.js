FieldView = Backbone.View.extend({

  // TODO: cache the input element lookup
  initialize: function() {
    // TODO: right way to do this showing/hiding?
    this.model.bind('hide', this.hide, this);
    this.model.bind('show', this.show, this);
    // only call render once. model will never update
    this.render();
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));
    // add to dom
    this.options.form.append(this.$el);
    this.show();
  },

  addRules: function () {
    this.addRequiredRule();
    this.addSpecialRules();
  },

  addRequiredRule: function () {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }
  },

  addSpecialRules: function () {
    var self = this;
    // also apply any special rules
    _(this.model.get('specialRules') || []).each(function (rule) {
      // TODO: more events like keyup/keypress
      self.$el.find('#' + self.model.get('ID')).bind('change', function () {
        var input = $(this);
        // apply action
        // TODO: check other action types
        if ('hide' === rule.actionType) {
          var fieldToHide = self.options.fieldsCollection.find(function (item) {
            return rule.actionField === item.get('ID');
          });

          if (fieldToHide != null) {
            // check condition
            // TODO: check filter type
            // TODO: check match type & other conditions, if any
            // TODO: value to check may not always be an input value
            if (input.val() === rule.value) {
              fieldToHide.trigger('hide');
            } else {
              fieldToHide.trigger('show');
            }
          }
        }
      });
    });
  },

  removeRules: function () {
    this.$el.find('#' + this.model.get('ID')).unbind('change').rules('remove');
  },

  hide: function () {
    if (this.$el.is(':visible')) {
      this.$el.hide();
      // remove rules too
      this.removeRules();
    }
  },

  show: function () {
    if (this.$el.not(':visible')) {
      this.$el.show();
      // add rules too
      this.addRules();
    }
  }
});