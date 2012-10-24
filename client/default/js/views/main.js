(function($) {

  MainView = Backbone.View.extend({
    render: function() {
      this.header = new HeaderView();
      this.formlist = new FormListView();
    }
  });

})(jQuery);