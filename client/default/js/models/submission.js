SubmissionModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        var self = this;
        if (method == "read") {
            this.loadSubmission(this.submissionMeta, function(err, sub) {});
        } else if (method == "delete") {
            this.coreModel.clearLocal(function() {});
        } else {
            debugger;
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
                self.initModel();
                self.trigger("change");
                cb(err, submission);
            });
        });
    },
    initModel: function() {
        var coreModel = this.coreModel;
        var self = this;
        coreModel.on("inprogress", function(ut) {
            App.collections.pending_waiting.fetch();
            App.collections.pending_submitting.fetch();
            AlertView.showAlert({
                "text": "Form submission started."
            }, "success", 5000);
            ut.on("progress", function(progress) {

                AlertView.showAlert({
                    "text": "Progress",
                    "current": progress.uploaded,
                    "total": progress.totalSize
                }, "success", 5000);
            });
        });
        coreModel.on("submitted", function(err) {
            if (!err) {
                AlertView.showAlert({
                    "text": "Form submission submitted."
                }, "success", 5000);
                App.collections.pending_submitting.fetch();
                App.collections.sent.fetch();
            } else {
                AlertView.showAlert({
                    "text": "Failed:" + err
                }, "success", 5000);
                App.collections.pending_submitting.fetch();
                App.collections.pending_review.fetch();
            }
        });
        coreModel.on("submit", function() {
            App.collections.drafts.fetch();
            App.collections.pending_waiting.fetch();
        });
    },
    get: function(key) {
        var res = Backbone.Model.prototype.get.apply(this, arguments);
        if (res && res != "") {
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
        $fh.forms.getSubmissions({}, function(err, subList) {
            if (err) {

                cb(err);
            } else {
                var status = self.status;
                var submissions = subList.getSubmissions();
                if (status) {
                    submissions = subList.findByStatus(status);
                }
                self.coreModel = subList;
                cb(null, submissions);
            }
        })
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