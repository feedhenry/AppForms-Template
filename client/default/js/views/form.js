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

    this.model.fields.each(function (field, index) {
      var fieldType = field.getType();
      if (self.viewMap[fieldType]) {
        new self.viewMap[fieldType]({
          form: form,
          model: field,
          fieldsCollection: self.model.fields
        });
      } else {
        console.log('FIELD NOT SUPPORTED:' + fieldType);
      }
    });

    // TODO: Move to tpl
    var action_bar = $('<div>').addClass('fh_action_bar');

    // temp butan to validate
    action_bar.append($('<button>', {
      "text": "Validate",
    }).bind('click', function (e) {
      e.preventDefault();
      form.valid();
    }));

    this.$el.append(action_bar);

    this.$el.show();
    console.log('***** Form View! *****');
  }

});