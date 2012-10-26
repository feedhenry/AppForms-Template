$fh.ready(function() {

  PendingListView = Backbone.View.extend({
    el: $('#fh_wufoo_pending_list'),

    templates: {
      header: ['<h2>Pending Submissions</h2>', '<h4>Below are your pending submissions</h4>']  
    },

    initialize: function() {
      _.bindAll(this, 'render', 'appendForm', 'changed');

      App.collections.pending.bind('add', this.changed, this);
      App.collections.pending.bind("remove", this.changed, this);
      App.collections.pending.fetch();

      this.render();
    },

    render: function() {
      var self = this;
      App.views.header.markActive('.fh_wufoo_pending');
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
      _( App.collections.pending.models).each(function(form) {
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