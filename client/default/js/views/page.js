PageView = Backbone.View.extend({

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
    "europhone": FieldPhoneView,
    "shortname": FieldShortnameView,
    "address": FieldAddressView,
    "url": FieldUrlView,
    "money": FieldMoneyView,
    "likert": FieldLikertView,
    "fhgeo": FieldGeoView,
    "fhgeoEN": FieldGeoENView,
    "fhgeoen": FieldGeoENView,
    "fhcam": FieldCameraView,
    "fhsig": FieldSignatureView,
    "fhmap": FieldMapView,
    "fhtime": FieldCustomTimeView,
    "fhdate": FieldCustomDateView
  },

  initialize: function() {
    _.bindAll(this, 'render', 'serialize');
    this.fieldViews = {};
    this.render();
  },

  serialize: function() {
    var self = this;
    var serialized_page = {};
    $.each(self.fieldViews, function(i, field) {
      $.extend(serialized_page, field.serialize());
    });
    return serialized_page;
  },

  render: function() {
    var self = this;

    // all pages hidden initially
    this.$el.empty().addClass('page hidden');
    // add to parent before init fields so validation can work
    this.options.parentEl.append(this.$el);

    this.model.fields.each(function (field, index) {
      var fieldType = field.getType();
      if (self.viewMap[fieldType]) {
        self.fieldViews[field.get('ID')] = new self.viewMap[fieldType]({
          parentEl: self.$el,
          parentView: self,
          model: field
        });
      } else {
        console.log('FIELD NOT SUPPORTED:' + fieldType);
      }
    });
  },

  show: function () {
    this.$el.removeClass('hidden');
  },

  hide: function () {
    this.$el.addClass('hidden');
  },

  showField: function (id) {
    // show field if it's on this page
    if (this.fieldViews[id]) {
      this.fieldViews[id].show();
    }
  },

  hideField: function (id) {
    // hide field if it's on this page
    if (this.fieldViews[id]) {
      this.fieldViews[id].hide();
    }
  },

  isValid: function () {
    // only validate form inputs on this page
    return this.$el.find('input,select,option,textarea').not('[type="hidden"],:hidden').valid();
  },

  checkRules: function () {
    var self = this;

    /* "Rules": [{
      "RuleId": "60",
      "Type": "SkipToPage",
      "Setting": {
        "Page": "3"
      },
      "FormId": "57",
      "MatchType": "any",
      "Conditions": [{
        "ConditionId": "60",
        "FieldName": "2",
        "Filter": "is",
        "Value": "go",
        "ReportId": "57",
        "RuleId": "60"
      }],
      "condition": {
        "ConditionId": "60",
        "FieldName": "2",
        "Filter": "is",
        "Value": "go",
        "ReportId": "57",
        "RuleId": "60"
      }
    }]*/
    var result = {};

    var rules = {
      SkipToPage: function (rulePasses, params) {
        var pageToSkipTo = params.Setting.Page;
        if (rulePasses) {
          result.skipToPage = pageToSkipTo;
        }
      }
    };

    // iterate over page rules, if any, calling relevant rule function
    _(this.model.get('Rules') || []).forEach(function (rule, index) {
      // get element that rule condition is based on
      var jqEl = self.$el.find('#Field' + rule.condition.FieldName);
      rule.fn = rules[rule.Type];
      jqEl.wufoo_rules('exec', rule);
    });

    return result;
  }
  
});