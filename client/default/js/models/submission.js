SubmissionModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        var self = this;
        if (method == "read") {
            this.loadSubmission(this.submissionMeta, function(err, sub) {});
        } else if (method == "delete") {
            this.coreModel.clearLocal(function() {});
        } else {
            console.log("Should not be here");
        }
    },
    loadSubmission: function(submissionMeta, cb) {
        var self = this;
        $fh.forms.getSubmissions({}, function(err, subList) {
            subList.getSubmissionByMeta(submissionMeta, function(err, submission) {
                if (err) {
                    self.trigger("error", err);
                } else {
                    self.coreModel = submission;
                    self.id = submission.getLocalId();
                }

                self.coreModel.clearEvents();
                self.initModel();
                self.trigger("change");

                cb(err, submission);
            });
        });
    },
    deleteSubmission: function(cb){
        var self = this;
        self.loadSubmission(self.submissionMeta, function(err) {
            if (err) {
                $fh.forms.log.e("Error Loading Submission: ", err);
            } else {
                self.coreModel.clearLocal(function(err) {
                    if (err) console.error("Error clearing local: ", err);
                    
                    if(cb){
                        return cb(err);
                    }
                    return false;
                });
            }
        });
    },
    initModel: function() {
      var coreModel = this.coreModel;
      var self = this;
      coreModel.on("inprogress", function(ut) {
        self.refreshAllCollections();
      });
      coreModel.on("submitted", function(submissionId) {
        self.refreshAllCollections();
      });
      coreModel.on("submit", function() {
        self.refreshAllCollections();
      });
      coreModel.on("error", function() {
        self.refreshAllCollections();
      });
      coreModel.on("queued", function() {
        self.refreshAllCollections();
      });
      coreModel.on("progress", function(progress) {
        App.views.pending_list.updateSubmissionProgress(progress, this.getLocalId());
      });
    },
    refreshAllCollections: function() {
        refreshSubmissionCollections();
    },
    get: function(key) {
        var res = Backbone.Model.prototype.get.apply(this, arguments);
        if (res && res !== "") {
            return res;
        } else if (this.coreModel) {
            return this.coreModel.get(key);
        } else {
            return res;
        }
    },
    initialize: function(submissionMeta, options) {
        var self = this;
        this.submissionMeta = submissionMeta;
        this.loadSubmission(submissionMeta, function(err, sub) {});
    }
});
SubmissionCollection = Backbone.Collection.extend({
    model: SubmissionModel,
    status: null,
    initialize: function() {
        Backbone.Collection.prototype.initialize.apply(this, arguments);
    },
    getSubmissionList: function(cb) {
        var self = this;
        self.reset();
        $fh.forms.getSubmissions({}, function(err, subList) {
            
            if (err) {
                console.log(err);
                cb(err);
            } else {
                var status = self.status;
                var sortField = self.sortField;
                var submissions = subList.getSubmissions();
                if (status) {
                    submissions = subList.findByStatus({
                        sortField: sortField,
                        status: status
                    });
                }
                self.coreModel = subList;
                if(self.models.length > submissions.length){
                  self.length = submissions.length;
                }

                console.log("$fh.forms.getSubmissions", self.status, submissions);

                cb(null, submissions);
            }
        });
    },
    clearSentSubmissions: function(cb){
        var self = this;
        self.coreModel.clearSentSubmission(function(err){
            console.log("Clear Sent Submissions Finished", err);
            if(err){
                return cb(err);
            }
            self.fetch();
            return cb();
        });
    },
    sync: function(method, collection, options) {
        if (method == "read") {
            this.getSubmissionList(function(err, submissions) {
                if (err) {
                    options.error(err);
                } else {
                    options.success(submissions);
                }
            });
        }
    }
});

SentModel = SubmissionModel.extend({});

SentCollection = SubmissionCollection.extend({
    status: "submitted",
    model: SentModel,
    sortField: "submittedDate"
});
PendingModel = SubmissionModel.extend({

});

PendingWaitingCollection = SubmissionCollection.extend({
    status: ["pending", "inprogress"],
    sortField: "submitDate"
});
PendingSubmittingCollection = SubmissionCollection.extend({
    status: "queued",
    sortField: "uploadStartDate"
});

PendingReviewCollection = SubmissionCollection.extend({
    status: "error",
    sortField: "uploadStartDate"
});

DraftModel = SubmissionModel.extend({});

DraftsCollection = SubmissionCollection.extend({
    model: DraftModel,
    status: "draft",
    sortField: "saveDate"
});


App.collections.drafts = new DraftsCollection();
App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.sent = new SentCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();

function refreshSubmissionCollections() {
    console.log("Refreshing All Collections");
    App.collections.drafts.fetch();
    App.collections.sent.fetch();
    App.collections.pending_submitting.fetch();
    App.collections.pending_waiting.fetch();
    App.collections.pending_review.fetch();
}