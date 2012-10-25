$fh.ready(function() {

  FormView = Backbone.View.extend({
    el: $('#fh_wufoo_content'),

    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
      console.log(this.model);
    },

    render: function() {
      var self = this;
      App.views.header.hideAll();
      $(this.el).empty();
      $(this.el).append('<h4>A form!</h4>');
      $(this.el).show();
      console.log('***** Form View! *****');
    }

  });
});