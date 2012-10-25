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
      _.bindAll(this, 'render', 'showHome', 'updateCounts');

      App.collections.drafts.bind('add', this.updateCounts, this);
      App.collections.drafts.bind("remove", this.updateCounts, this);

      this.render();
    },

    render: function() {
      var html = this.template;
      console.log('render headerView');
      $(this.el).empty();
      $(this.el).append(html);
      $(this.el).show();

      // Update counts
      this.updateCounts();
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
    },

    updateCounts: function() {
      var drafts_count = App.collections.drafts.length;
      if (drafts_count > 0) {
        $('.fh_wufoo_drafts .count', this.el).text(drafts_count).show();
      } else {
        $('.fh_wufoo_drafts .count', this.el).hide();
      }
    }
  });

});