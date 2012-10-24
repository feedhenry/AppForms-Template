(function($) {

  MainView = Backbone.View.extend({
    render: function() {
      this.formlist = new FormListView();
    }
  });

})(jQuery);