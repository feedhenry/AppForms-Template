$fh.ready(function() {

  DraftListView = Backbone.View.extend({
    el: $('#fh_wufoo_drafts_list'),

    templates: {
      header: ['<h2>Drafts</h2>', '<h4>Choose a Draft form from the list below</h4>']  
    },

    initialize: function() {
      _.bindAll(this, 'render', 'appendForm', 'changed');

      this.collection = App.collections.drafts;
      this.collection.bind('add', this.changed, this);
      this.collection.bind("remove", this.changed, this);

      App.collections.drafts.fetch();

      this.render();
    },

    render: function() {
      var self = this;
      console.log('render DraftListView');

      App.views.header.markActive('.fh_wufoo_drafts');

      this.changed();

      // Add header
      $(this.el).prepend(this.templates.header.join(''));

      $(this.el).show();
    },

    changed: function() {
      var self = this;
      // Empty our existing view
      $(this.el).empty();

      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(form) {
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