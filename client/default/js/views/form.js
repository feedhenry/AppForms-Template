FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView,
    "date": FieldDateView,
    "textarea": FieldTextareaView,
    "radio": FieldRadioView,
    "checkbox": FieldCheckboxView,
    "select": FieldSelectView,
    "file": FieldFileView,
    "email": FieldEmailView,
    "time": FieldTimeView,
    "phone": FieldPhoneView,
    "shortname": FieldShortnameView,
    "address": FieldAddressView,
    "url": FieldUrlView,
    "money": FieldMoneyView,
    "likert": FieldLikertView
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();
    
    var form = $('<form>');
    this.$el.empty().append(form);
    form.validate();

// look at special rules & update field models accordingly
/*      var specialRules = this.model.get('Rules');
      var FieldRules = specialRules ? specialRules.FieldRules : null;
      if (FieldRules !== null) {
        _(FieldRules).each(function (fRule) {
          if ('Hide' === fRule.Type) {
            _(fRule.Conditions).each(function (condition) {
              var filter = condition.Filter;
              var value = condition.Value;
              var field = "Field" + condition.FieldName;
              
            });


          }
        });
      }*/

    _(this.model.get('Fields')).each(function (field) {
      var fieldType = self.model.getFieldType(field);

      if (self.viewMap[fieldType]) {
        new self.viewMap[fieldType]({
          el: form[0],
          field: field
        });
        $(form).append('<br/>');
      } else {
        console.log('FIELD NOT SUPPORTED:' + fieldType);
      }
    });

    // temp butan to validate
    this.$el.append($('<button>', {
      "text": "Validate"
    }).bind('click', function (e) {
      e.preventDefault();
      form.valid();
    }));

    this.$el.show();
    console.log('***** Form View! *****');
  }

});