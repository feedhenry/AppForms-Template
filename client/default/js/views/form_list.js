$fh.ready(function() {

  FormListView = Backbone.View.extend({
    el: $('#fh_wufoo_form_list'),

    templates: {
      header: ['<h2>Your Forms</h2>', '<h4>Choose a form from the list below</h4>']
    },

    initialize: function() {
      _.bindAll(this, 'render', 'appendForm');

      this.collection = App.collections.forms;
      this.collection.bind('add', this.render, this);
      this.collection.bind("remove", this.render, this);

      App.collections.forms.fetch();

      this.render();
    },

    render: function() {
      var self = this;
      console.log('render FormListView');

      App.views.header.markActive('.fh_wufoo_home');

      // Empty our existing view
      $(this.el).empty();

      // Add header
      $(this.el).append(this.templates.header.join(''));

      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(form) {
        self.appendForm(form);
      }, this);
      $(this.el).show();
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