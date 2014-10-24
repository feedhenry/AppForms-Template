QueuedListView = SubmissionListview.extend({
    el: $('#fh_content_queued'),

    events: {
    },

    templates: {
    },

    initialize: function() {
        _.bindAll(this, 'render', 'changed');

        this.listenTo(App.collections.pending_submitting, 'change add remove reset sync', this.changed);
        
        this.render();
    },
    render: function(){

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html())());
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

    hide: function() {
        $(this.$el).hide();
    },
    show: function() {
        App.views.header.markActive('header_queued', "Uploading");
        $(this.$el).show();
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html(), {}));

        var empty = App.collections.pending_submitting.models.length === 0;


        self.renderGroup(App.collections.pending_submitting);
    },
    appendFunction: function(form, formId) {
        this.appendItemView(form, formId, PendingSubmittingItemView);
    }
});