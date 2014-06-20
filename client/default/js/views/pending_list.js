PendingListView = Backbone.View.extend({
    el: $('#fh_content_pending'),

    events: {
        'click button.submit-all': 'submitAll'
    },

    templates: {
        pending_waiting_list: '<div id="pending_waiting_submissions" class="table-responsive col-xs-12 text-center"><table class="fh_appform_field_area list inset pending_waiting_list table table-bordered"><tr><th colspan="4"><h2 class="text-center">Pending Submissions<h2></th></tr><tr><th class="text-center">Form Name</th class="text-center"><th class="text-center">Form Id</th><th class="text-center">Saved At</th><th class="text-center">Actions</th></tr></table></div>',
        pending_waiting_header: '',
        pending_waiting_submitall: '<button class="col-xs-12 fh_appform_button_action submit-all button button-positive button-block btn btn-default">Submit All Awaiting Forms</button>',
        pending_submitting_list: '<div class="table-responsive col-xs-12 text-center"><table class="fh_appform_field_area list inset pending_submitting_list table table-bordered"><tr><th colspan="4"><h2 class="text-center">Currently Submitting<h2></th></tr><tr><th class="text-center">Form Name</th class="text-center"><th class="text-center">Form Id</th><th class="text-center">Uploaded At</th><th class="text-center">Progress</th></tr></table></div>',
        pending_submitting_header: '',
        pending_review_list: '<div class="table-responsive col-xs-12 text-center"><table class="fh_appform_field_area list inset pending_review_list table table-bordered"><tr><th colspan="5"><h2 class="text-center">These submissions need to be reviewed<h2></th></tr><tr><th class="text-center">Form Name</th class="text-center"><th class="text-center">Form Id</th><th class="text-center">Saved At</th><th class="text-center">Error</th><th class="text-center">Actions</th></tr></table></div>',
        pending_review_header: ''
    },

    initialize: function() {
        _.bindAll(this, 'render', 'changed');

        App.collections.pending_submitting.bind('change add remove reset sync', this.changed, this);
        App.collections.pending_review.bind('change remove reset sync', this.changed, this);
        App.collections.pending_waiting.bind('change remove reset sync', this.changed, this);

        this.render();
    },

    scrollToTop: function() {
        window.scrollTo(0, 0);
    },
    updateSubmissionProgress: function(progress, subLocalId) {
        console.log("PROGRESS", progress, subLocalId);
        var progPercentage = 0;

        if (progress && subLocalId) {
            if (progress.totalSize && progress.totalSize > 0) {
                if (progress.uploaded > 0) {
                    progPercentage = (progress.uploaded / progress.totalSize) * 100;
                }
            }
        }

        if (subLocalId && typeof subLocalId === 'string') {
            var eleToUpdate = $('#progress-' + subLocalId);
            console.log("ELE ", eleToUpdate);
            if (eleToUpdate && eleToUpdate.length > 0) {
                eleToUpdate = $(eleToUpdate[0]);
                if(progPercentage === 100){
                    eleToUpdate.addClass('progress-bar-success');
                }
                eleToUpdate.css("width", progPercentage + "%");
                eleToUpdate.html('<span class="sr-only">' + progPercentage + '% Complete</span>');
            }
        }
    },

    submitAll: function() {
        var self = this;
        this.scrollToTop();
        var loadingView = new LoadingCollectionView();
        loadingView.show("Submitting Pending Forms");
        var c = 1;
        var tasks = _.collect(App.collections.pending_waiting.models, function(model) {
            return function(callback) {
                model.coreModel.upload(function() {});
            };
        }); // Kick things off by fetching when all stores are initialised

        async.series(tasks, function() {});
        return false;
    },

    show: function() {
        App.views.header.markActive('header_pending');
        $(this.$el).show();
    },

    hide: function() {
        $(this.$el).hide();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        var pendingWaitingList = _.template($('#draft-list').html(), {title: "Waiting"});
        var pendingSubmittingList = _.template($('#draft-list').html(), {title: "Submitting"});
        var pendingReviewList = _.template($('#draft-list').html(), {title: "Review"});

        $(this.$el).append(pendingWaitingList);
        $(this.$el).append(pendingSubmittingList);
        $(this.$el).append(pendingReviewList);

        _(App.collections.pending_waiting.models).each(function(form) {
            self.appendWaitingForm(form);
        }, this);


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
        $('#drafts-list-Waiting', this.$el).append(view.render().$el);
    },

    appendSubmittingForm: function(form) {
        var view = new PendingSubmittingItemView({
            model: form
        });
        $('#drafts-list-Submitting', this.$el).append(view.render().$el);
    },

    appendReviewForm: function(form) {
        var view = new PendingReviewItemView({
            model: form
        });
        $('#drafts-list-Review', this.$el).append(view.render().$el);
    }
});