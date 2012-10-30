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

  // keep ref to all field views
  fieldViews: {},

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;

    this.$el.empty().addClass('page');
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

    this.$el.append('<br>---------PAGE BREAK --------<br>');
  },

  showField: function (id) {
    this.fieldViews[id].show();
  },

  hideField: function (id) {
    this.fieldViews[id].hide();
  }

});