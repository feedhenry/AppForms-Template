FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
    console.log(this.model);
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();
    
    var form = $('<form>');
    this.$el.empty().append(form);
    form.validate();

    _(this.model.get('Fields')).each(function (field) {
      if (self.viewMap[field.Type] != null) {
        new self.viewMap[field.Type]({
          el: form[0],
          field: field
        });
      } else {
        console.log('FIELD NOT SUPPORTED:' + field.Type);
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