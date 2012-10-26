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
    "likert": FieldLikertView,
    "fhgeo": FieldGeoView,
    "fhgeoEN": FieldGeoENView,
    "fhcam": FieldCameraView,
    "fhsig": FieldSignatureView,
    "fhmap": FieldMapView,
    "fhtime": FieldCustomTimeView,
    "fhdate": FieldCustomDateView
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
    // need to call validate before adding rules one by one. Alternative to adding all rules at once
    form.validate();

    // look at special rules & update field models accordingly
    var specialRules = {};
    _(this.model.get('Rules').FieldRules || []).each(function (fRule) {
      // TODO: check other types
      if ('Hide' === fRule.Type) {
        _(fRule.Conditions).each(function (condition) {
          var fieldName = "Field" + condition.FieldName;
          specialRules[fieldName] = specialRules[fieldName] || [];
          // TODO: is this enough to pass into model?
          specialRules[fieldName].push({
            "id": fRule.RuleId,
            "filter": condition.Filter,
            "value": condition.Value,
            "match": fRule.MatchType,
            "actionType": "hide",
            "actionField": 'Field' + fRule.Setting.FieldName
          });
        });
      }
    });

    /*"RuleId": "61",
        "Type": "Hide",
        "Setting": {
          "FieldName": "5",
          "FieldTypes": {
            "3": "number"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [
          {
            "ConditionId": "61",
            "FieldName": "3",
            "Filter": "is equal to",
            "Value": "7",
            "ReportId": "57",
            "RuleId": "61"
          }
        ]*/

    this.model.fields.each(function (field, index) {
      var fieldType = field.getType();
      var fieldId = field.get('ID');
      if (specialRules[fieldId]) {
        field.set('specialRules', specialRules[fieldId]);
      }

      if (self.viewMap[fieldType]) {
        new self.viewMap[fieldType]({
          el: form[0],
          model: field,
          fieldsCollection: self.model.fields
        });
        form.append('<br/>');
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