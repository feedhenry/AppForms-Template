$fh.ready(function() {

  HeaderView = Backbone.View.extend({
    el: $('#fh_wufoo_header_wrapper'),

    template: ['<ul id="fh_wufoo_header">', '<li class="fh_wufoo_home active">Home</li>', '<li class="fh_wufoo_drafts">Drafts<span class="count hidden">0</span></li>', '<li class="fh_wufoo_pending">Pending<span class="count hidden">0</span></li>', '</ul>', '<div id="fh_wufoo_alerts_area"></div>'].join(''),

    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function() {
      var html = this.template;
      console.log('render headerView');
      $(this.el).empty();
      $(this.el).append(html);
      $(this.el).show();

      // Update counts
    },
  });

});