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
    // add to dom
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));
    this.show();
  },

  addRules: function () {
    var self = this;
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }

    // also apply any special rules
    _(this.model.get('specialRules') || []).each(function (rule) {
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
    var input = this.$el.find('#' + this.model.get('ID'));
    if (input.is(':visible')) {
      this.$el.find('#' + this.model.get('ID')).prev('label').andSelf().hide();
      // remove rules too
      this.removeRules();
    }
  },

  show: function () {
    var input = this.$el.find('#' + this.model.get('ID'));
    if (input.not(':visible')) {
      input.prev('label').andSelf().show();
      // add rules too
      this.addRules();
    }
  }
});