HeaderView = Backbone.View.extend({
  el: $('#fh_wufoo_header_wrapper'),

  events: {
    'click li.fh_wufoo_home': 'showHome',
    'click li.fh_wufoo_drafts': 'showDrafts',
    'click li.fh_wufoo_pending': 'showPending'
  },

  template: ['<ul id="fh_wufoo_header">', '<li class="fh_wufoo_home">Home</li>', '<li class="fh_wufoo_drafts">Drafts<div class="count hidden">0</div></li>', '<li class="fh_wufoo_pending">Pending<div class="count hidden">0</div></li>', '</ul>', '<div id="fh_wufoo_alerts_area"></div>'].join(''),

  initialize: function() {
    this.undelegateEvents();
    _.bindAll(this, 'render', 'showHome', 'showDrafts', 'showPending', 'updateCounts');

    App.collections.drafts.bind('add remove reset', this.updateCounts, this);
    App.collections.pending.bind('add remove reset', this.updateCounts, this);

    this.render();
  },

  render: function() {
    var html = this.template;
    console.log('render headerView');
    $(this.el).empty();
    $(this.el).append(html);
    $(this.el).show();
  },

  showHome: function() {
    this.hideAll();
    App.views.form_list.show();
  },

  showDrafts: function() {
    this.hideAll();
    App.views.drafts_list.show();
  },

  showPending: function() {
    this.hideAll();
    App.views.pending_list.show();
  },

  hideAll: function() {
    window.scrollTo(0, 0);
    App.views.form_list.hide();
    App.views.drafts_list.hide();
    App.views.pending_list.hide();
    if (_.isObject(App.views.form)) {
      App.views.form.hide();
    }
  },

  markActive: function(tab_class) {
    $('li', this.el).removeClass('active');
    $(tab_class, this.el).addClass('active');
  },

  updateCounts: function() {
    // TODO: DRY
    var drafts_count = App.collections.drafts.length;
    if (drafts_count > 0) {
      $('.fh_wufoo_drafts .count', this.el).text(drafts_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_drafts .count', this.el).hide();
    }

    var pending_count = App.collections.pending.length;
    if (pending_count > 0) {
      $('.fh_wufoo_pending .count', this.el).text(pending_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_pending .count', this.el).hide();
    }
  }
});