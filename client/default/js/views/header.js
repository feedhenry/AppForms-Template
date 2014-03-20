HeaderView = Backbone.View.extend({
  el: '#fh_wufoo_header',

  events: {
    'click li.fh_wufoo_home': 'showHome',
    'click li.fh_wufoo_drafts': 'showDrafts',
    'click li.fh_wufoo_pending': 'showPending',
    'click li.fh_wufoo_sent': 'showSent'
  },
  
  templates: {
    list: '<ul class="segmented-controller fh_appform_button_navigation"></ul>',
    forms_button: '<li class="fh_wufoo_home"><a class="" href="#">Forms</a></li>',
    drafts_button: '<li class="fh_wufoo_drafts"><a class="" href="#">Drafts<span class="count"></span></a></li>',
    pending_button: '<li class="fh_wufoo_pending"><a class="" href="#">Pending<span class="count"></span></a></li>',
    sent_button: '<li class="fh_wufoo_sent"><a class="" href="#">Sent<span class="count"></span></a></li>'
  },

  initialize: function() {
    this.undelegateEvents();
    _.bindAll(this, 'render', 'advise', 'adviseAll', 'showHome', 'showDrafts', 'showPending', 'updateCounts');

    App.collections.drafts.bind('add remove reset', this.updateCounts, this);
    App.collections.pending_submitting.bind('add remove reset', this.updateCounts, this);
    App.collections.pending_review.bind('add remove reset', this.updateCounts, this);
    App.collections.pending_waiting.bind('add remove reset', this.updateCounts, this);
    App.collections.sent.bind('add remove reset', this.updateCounts, this);

    var self = this;
    this.adviseAll();
    this.render();
  },

  render: function() {
    $(this.el).empty();

    var list = $(_.template(this.templates.list, {}));
    list.append(this.templates.forms_button);
    list.append(this.templates.drafts_button);
    list.append(this.templates.pending_button);
    list.append(this.templates.sent_button);

    $(this.el).append(list);
    $(this.el).show();
  },
  adviseAll: function() {
    this.showHome = this.advise(this.showHome);
    this.showDrafts= this.advise(this.showDrafts);
    this.showPending= this.advise(this.showPending);
    this.showSent= this.advise(this.showSent);
  },
  advise: function(func) {
    var self = this;
    return function() {
      var skip = false;
      var args = arguments;
      if(args.length && args[0] === true) {
        skip = true;
      }
      var proceed = function(clear){
        try {
          return func.call(self,args);
        } finally {
          if(clear && App.views.form){
            App.views.form=null;
          }
        }
      };
      if(skip || App.views.form == null || App.views.form.readonly) {
        return proceed();
      } else {
        var confirmDelete = confirm('It looks like you have unsaved data -- if you leave before submitting your changes will be lost. Continue?');
        if (confirmDelete) {
          return proceed(true);
        } else {
          return false;
        }
      }
    };
  },

  showHome: function() {
    this.hideAll();
    App.views.form_list.show();
    return false;
  },

  showDrafts: function() {
    this.hideAll();


    App.views.drafts_list.show();
    return false;
  },

  showPending: function() {
    this.hideAll();
    App.views.pending_list.show();
    return false;
  },

  showSent: function() {
    this.hideAll();
    App.views.sent_list.show();
    return false;
  },

  showSettings: function () {
    this.hideAll();
    App.views.settings.show();
  },
  hideAll: function() {
    window.scrollTo(0, 0);
    App.views.form_list.hide();
    App.views.drafts_list.hide();
    App.views.pending_list.hide();
    App.views.sent_list.hide();
    App.views.settings.hide();
    if (_.isObject(App.views.form)) {
      App.views.form.el.hide();
      //App.views.form = null;
    }
  },

  markActive: function(tab_class) {
    $('li', this.el).removeClass('fh_appform_button_default_active');
    $(tab_class, this.el).addClass('fh_appform_button_default_active');
  },

  updateCounts: function() {
    // TODO: DRY
    var drafts_count = App.collections.drafts.length;
    if (drafts_count > 0) {
      $('.fh_wufoo_drafts .count', this.el).text(drafts_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_drafts .count', this.el).hide();
    }

    var pending_count = App.collections.pending_submitting.length + App.collections.pending_review.length + App.collections.pending_waiting.length;

    if (pending_count > 0) {
      $('.fh_wufoo_pending .count', this.el).text(pending_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_pending .count', this.el).hide();
    }

    var sent_count = App.collections.sent.length;
    if (sent_count > 0) {
      $('.fh_wufoo_sent .count', this.el).text(sent_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_sent .count', this.el).hide();
    }
  }
});