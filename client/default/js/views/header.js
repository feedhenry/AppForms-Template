$fh.ready(function() {

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

      App.collections.drafts.bind('add', this.updateCounts, this);
      App.collections.drafts.bind("remove", this.updateCounts, this);
      App.collections.pending.bind('add', this.updateCounts, this);
      App.collections.pending.bind("remove", this.updateCounts, this);

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
      if (!_.isUndefined(App.views.drafts_list)) {
        $(App.views.drafts_list.el).hide();
      }
      if (!_.isUndefined(App.views.pending_list)) {
        $(App.views.pending_list.el).hide();
      }

      this.hideForm();

      App.views.form_list = new FormListView();
    },

    showDrafts: function() {
      if (!_.isUndefined(App.views.form_list)) {
        $(App.views.form_list.el).hide();
      }
      if (!_.isUndefined(App.views.pending_list)) {
        $(App.views.pending_list.el).hide();
      }

      this.hideForm();

      App.views.drafts_list = new DraftListView();
    },

    showPending: function() {
      if (!_.isUndefined(App.views.form_list)) {
        $(App.views.form_list.el).hide();
      }
      if (!_.isUndefined(App.views.drafts_list)) {
        $(App.views.drafts_list.el).hide();
      }

      this.hideForm();

      App.views.pending_list = new PendingListView();
    },

    hideAll: function() {
      if (!_.isUndefined(App.views.form_list)) {
        $(App.views.form_list.el).hide();
      }
      if (!_.isUndefined(App.views.drafts_list)) {
        $(App.views.drafts_list.el).hide();
      }
      if (!_.isUndefined(App.views.pending_list)) {
        $(App.views.pending_list.el).hide();
      }
    },

    hideForm: function() {
      window.scrollTo(0, 0);
      if (!_.isUndefined(App.views.form)) {
        $(App.views.form.el).hide();
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

});