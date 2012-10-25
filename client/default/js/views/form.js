FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView,
    "date": FieldDateView,
    "file": FieldDateView
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();
    
    var form = $('<form>');
    $(this.el).empty().append(form);
    form.validate();

    _(this.model.get('Fields')).each(function (field) {
      if (self.viewMap[field.Type] != null) {
        var fieldType = self.model.getFieldType(field);
        new self.viewMap[field.Type]({
          el: form[0],
          field: field
        });
        $(form).append('<br/>');
      } else {
        console.log('FIELD NOT SUPPORTED:' + field.Type);
      }
    });

    $(this.el).show();
    console.log('***** Form View! *****');
  }

});