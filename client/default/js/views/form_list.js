$fh.ready(function() {

  FormListView = Backbone.View.extend({
    el: $('#fh_wufoo_form_list'),

    events: {
      'click button#add': 'addItem'
    },

    templates: {
      header: ['<h2>Your Forms</h2>', '<h4>Choose a form from the list below</h4>']  
    },

    initialize: function() {
      _.bindAll(this, 'render', 'appendForm');

      this.collection = App.forms_collection;
      this.collection.bind('add', this.appendForm);
      this.collection.bind("remove", this.render, this);

      App.forms_collection.fetch();

      this.render();
    },

    render: function() {
      var self = this;
      console.log('render FormListView');

      this.header = new HeaderView();

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
      console.log('appendForm called!')
      // Todo: Move into new view
      var html = _.template('<li><button><%= name %></button></li>', { name: form.get("Name") });
      $('ul', this.el).append(html);
    }
  });

});