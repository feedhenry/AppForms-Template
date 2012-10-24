(function($) {

  HeaderView = Backbone.View.extend({
    el: $('#fh_wufoo_header_wrapper'),

    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function() {
      $(this.el).show();
      console.log('render headerView');
    }
  });

})(jQuery);
