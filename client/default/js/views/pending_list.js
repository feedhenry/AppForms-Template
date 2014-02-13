PendingListView = Backbone.View.extend({
  el: $('#fh_wufoo_pending'),

  events: {
    'click button.submit-all': 'submitAll'
  },

  templates: {
    pending_waiting_list: '<ul class="fh_appform_field_area list inset pending_waiting_list"></ul>',
    pending_waiting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms Awaiting Submission</div></li>',
    pending_waiting_submitall: '<li><button class="fh_appform_button_action submit-all button button-positive button-block">Submit All Awaiting Forms</button></li>',
    pending_submitting_list: '<ul class="fh_appform_field_area list inset pending_submitting_list"></ul>',
    pending_submitting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms currently being submitted</div><div class="loading hidden"></div></li>',
    pending_review_list: '<ul class="fh_appform_field_area list inset pending_review_list"></ul>',
    pending_review_header: '<li class="list-divider"><div class="fh_appform_field_title">These submissions need to be reviewed</div></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'changed');

    App.collections.pending_submitting.bind('add remove reset', this.changed, this);
    App.collections.pending_review.bind('add remove reset', this.changed, this);
    App.collections.pending_waiting.bind('add remove reset', this.changed, this);

    this.render();
  },

  scrollToTop: function() {
    window.scrollTo(0, 0);
  },

  submitAll: function() {
    var self = this;
    this.scrollToTop();
    var loadingView = new LoadingCollectionView();
    loadingView.show("Submitting Pending Forms");
    var c = 1;
    var tasks = _.collect(App.collections.pending_waiting.models,function (model) {
      return function (callback){

        loadingView.updateProgress(c * 100 / tasks.length);
        loadingView.updateMessage("Starting " + c + " of "  + tasks.length);
        model.coreModel.upload(function(){});
        model.coreModel.on("submitted",function(err){
          if (!err){
            loadingView.updateMessage("Completed " + c + " of "  + tasks.length);
          }else{
            loadingView.updateMessage("Submitting " + c + " failed");
          }
          callback(null);
        });
      };
    });    // Kick things off by fetching when all stores are initialised

    async.series(tasks, function (){
      loadingView.hide();
    });
    return false;
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_pending');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  changed: function() {
    // debugger;
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.pending_waiting_list);
    $('.pending_waiting_list', this.el).append(this.templates.pending_waiting_header);

    $(this.el).append(this.templates.pending_submitting_list);
    $('.pending_submitting_list', this.el).append(this.templates.pending_submitting_header);

    $(this.el).append(this.templates.pending_review_list);
    $('.pending_review_list', this.el).append(this.templates.pending_review_header);

    _(App.collections.pending_waiting.models).each(function(form) {
      self.appendWaitingForm(form);
    }, this);

    if (App.collections.pending_waiting.length > 0) {
      $('.pending_waiting_list', this.el).append(this.templates.pending_waiting_submitall);
    }

    if (App.collections.pending_submitting.length > 0) {
      $('.loading', this.el).show();
    } else {
      $('.loading', this.el).hide();
    }

    _(App.collections.pending_submitting.models).each(function(form) {
      self.appendSubmittingForm(form);
    }, this);

    _(App.collections.pending_review.models).each(function(form) {
      self.appendReviewForm(form);
    }, this);
  },

  appendWaitingForm: function(form) {
    var view = new PendingWaitingView({
      model: form
    });
    $('.pending_waiting_list', this.el).append(view.render().el);
  },

  appendSubmittingForm: function(form) {
    var view = new PendingSubmittingItemView({
      model: form
    });
    $('.pending_submitting_list', this.el).append(view.render().el);
  },

  appendReviewForm: function(form) {
    var view = new PendingReviewItemView({
      model: form
    });
    $('.pending_review_list', this.el).append(view.render().el);
  }
});