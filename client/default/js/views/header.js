$fh.ready(function() {

  HeaderView = Backbone.View.extend({
    el: $('#fh_wufoo_header_wrapper'),

    events: {
      'click li.fh_wufoo_home': 'showHome',
      'click li.fh_wufoo_drafts': 'showDrafts'
    },

    template: ['<ul id="fh_wufoo_header">', '<li class="fh_wufoo_home">Home</li>', '<li class="fh_wufoo_drafts">Drafts<span class="count hidden">0</span></li>', '<li class="fh_wufoo_pending">Pending<span class="count hidden">0</span></li>', '</ul>', '<div id="fh_wufoo_alerts_area"></div>'].join(''),

    initialize: function() {
      this.undelegateEvents();
      _.bindAll(this, 'render', 'showHome');
      this.render();
    },

    render: function() {
      var html = this.template;
      console.log('render headerView');
      $(this.el).empty();
      console.log($(this.el));
      $(this.el).append(html);
      $(this.el).show();

      // Update counts
    },

    showHome: function() {
      $(App.views.drafts_list.el).hide();
      App.views.form_list = new FormListView();
    },

    showDrafts: function() {
      console.log('showDrafts firing!')
      $(App.views.form_list.el).hide();
      App.views.drafts_list = new DraftListView();
    },

    markActive: function(tab_class) {
      $('li', this.el).removeClass('active');
      $(tab_class, this.el).addClass('active');
    }
  });

});