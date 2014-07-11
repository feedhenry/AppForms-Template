PendingListView = SubmissionListview.extend({
    el: $('#fh_content_pending'),

    events: {
        'click button.submit-all': 'submitAll'
    },

    templates: {
    },

    initialize: function() {
        _.bindAll(this, 'render', 'changed');

        App.collections.pending_submitting.bind('change add remove reset sync', this.changed, this);
        App.collections.pending_review.bind('change remove reset sync', this.changed, this);
        App.collections.pending_waiting.bind('change remove reset sync', this.changed, this);

        this.render();
    },
    render: function(){

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html()));
    },

    scrollToTop: function() {
        window.scrollTo(0, 0);
    },
    updateSubmissionProgress: function(progress, subLocalId) {
        console.log("PROGRESS", progress, subLocalId);
        var progPercentage = 0;

        if (progress && subLocalId) {

            if(progress.formJSON){
                progPercentage = 15;   
            }

            if (progress.totalSize && progress.totalSize > 0) {
                if (progress.uploaded > 0) {
                    progPercentage += ((progress.uploaded / progress.totalSize) * 85);
                }
            }
        }

        if (subLocalId && typeof subLocalId === 'string') {
            var eleToUpdate = $('#progress-' + subLocalId);
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
        loadingView.show("Queueing Pending Forms For Upload", 10);
        var c = 1;
        var tasks = _.collect(App.collections.pending_waiting.models, function(model) {
            return function(callback) {
                model.loadSubmission(model.submissionMeta, function(err){
                    model.coreModel.upload(callback);    
                });
            };
        }); // Kick things off by fetching when all stores are initialised

        async.series(tasks, function(err) {
            console.log("Submissions Queued", err);
            loadingView.show("Queueing Submissions Complete", 100);
            loadingView.hide();  
        });
        return false;
    },

    show: function() {
        App.views.header.markActive('header_pending', "Pending");
        $(this.$el).show();
    },

    hide: function() {
        $(this.$el).hide();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html(), {}));

        var empty = App.collections.pending_waiting.models.length === 0;

        var optionsHtml = "";

        if(App.collections.pending_waiting.models.length > 0){
            optionsHtml = _.template($("#pending-list-options").html(), {}); 
        }

        var optionsTemplate = _.template($("#draft-list-options").html(), {
            optionsHtml: optionsHtml,
            hideOptions: empty,
            type: "pending"   
        });

        this.$el.append(optionsTemplate);

        this.$el.find('.panel-heading').click(function(e){
            console.log(e);

            var type = $(e.currentTarget).data().type;
            $('#submission-options-' + type).slideToggle();
            $('#fh_appform_submission-options-' + type + '-body-icon').toggleClass('icon-chevron-sign-up');
            $('#fh_appform_submission-options-' + type + '-body-icon').toggleClass('icon-chevron-sign-down');
        });

        self.renderGroup(App.collections.pending_waiting);
    },
    appendFunction: function(form, formId) {
        this.appendItemView(form, formId, PendingWaitingView);
    }
});