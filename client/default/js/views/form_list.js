$fh.ready(function() {

  FormListView = Backbone.View.extend({
    el: $('#fh_wufoo_form_list'),

    templates: {
      header: ['<h2>Your Forms</h2>', '<h4>Choose a form from the list below</h4>']
    },

    initialize: function() {
      _.bindAll(this, 'render', 'appendForm', 'changed');

      App.collections.forms.bind('add', this.changed, this);
      App.collections.forms.bind("remove", this.changed, this);
      App.collections.forms.fetch();

      this.render();
    },

    render: function() {
      var self = this;
      App.views.header.markActive('.fh_wufoo_home');
      this.changed();
      $(this.el).show();
    },

    changed: function() {
      var self = this;

      // Empty our existing view
      $(this.el).empty();

      // Add header
      $(this.el).append(this.templates.header.join(''));

      $(this.el).append("<ul></ul>");
      _(App.collections.forms.models).each(function(form) {
        self.appendForm(form);
      }, this);
    },

    appendForm: function(form) {
      console.log('appendForm called!');
      var view = new ShowFormButtonView({
        model: form
      });
      $('ul', this.el).append(view.render().el);
    }
  });

});