$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, arguments);
            var self = this;

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

                        var result = err[fieldId];
                        if (!result.valid) {
                            for (var i = 0; i < result.errorMessages.length; i++) {
                                if (result.errorMessages[i]) {
                                    v.setErrorText(i, result.errorMessages[i]);
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
                self.submission.on("submitted", function() {
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