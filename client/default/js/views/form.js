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

  // keep ref to all field views
  fieldViews: {},

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

    this.model.fields.each(function (field, index) {
      var fieldType = field.getType();
      if (self.viewMap[fieldType]) {
        self.fieldViews[field.get('ID')] = new self.viewMap[fieldType]({
          formEl: form,
          formView: self,
          model: field
        });
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
  },

  showField: function (id) {
    this.fieldViews[id].show();
  },

  hideField: function (id) {
    this.fieldViews[id].hide();
  }

});