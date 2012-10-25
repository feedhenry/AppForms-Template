FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView,
    "date": FieldDateView
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