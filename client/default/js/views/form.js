$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            var self = this;
            self.options = params || {};
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, params);


            if (params.form) {
                params.formId = params.form.getFormId();
            }

            this.loadForm(params, function() {
                self.submission.on("savedraft", function(submission) {
                    App.views.header.showDrafts(true);
                    App.views.form = null;
                    refreshSubmissionCollections();
                });
                self.submission.on("submit", function() {
                    App.views.header.showPending(true);
                    App.views.form = null;
                    refreshSubmissionCollections();
                });

                self.submission.on('validationerror', function(err) {
                    self.fieldViews.forEach(function(v) {
                        var fieldId = v.model.getFieldId();

                        if (v.model.getType() === "sectionBreak") {
                            return;
                        }

                        var result = err[fieldId];

                        if (!result) {
                            return;
                        }
                        if (!result.valid) {
                            result.fieldErrorMessage = result.fieldErrorMessage || [];
                            for (var i = 0; i < result.fieldErrorMessage.length; i++) {
                                if (result.fieldErrorMessage[i]) {
                                    v.setErrorText(i, result.fieldErrorMessage[i]);
                                }
                            }
                        } else {
                            self.clearError(index);
                        }
                    });
                });
                self.submission.on("progress", function(progress) {
                    console.log("PROGRESS", progress, this);
                });
                self.submission.on("submitted", function(submissionId) {
                    console.log("SUBMITTED", this);
                });
                self.submission.on("error", function(errorMessage) {
                    console.log("ERROR", errorMessage);
                });
                self.submission.on("inprogress", function(uploadTask) {
                    console.log("READY FOR UPLOAD ", this, uploadTask);
                });
                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        }
    });
});