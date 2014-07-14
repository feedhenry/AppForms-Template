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

                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        },
        saveToDraft: function() {
            AlertView.showAlert("Saving Draft", "info", 1000);
            $fh.forms.backbone.FormView.prototype.saveToDraft.apply(this, [

                function() {
                    AlertView.showAlert("Draft Saved", "success", 1000);
                }
            ]);
        },
        submit: function() {

            AlertView.showAlert("Processing Submission", "info", 1000);

            $fh.forms.backbone.FormView.prototype.submit.apply(this, [

                function(err) {
                    if (err) {
                        console.log(err);
                        AlertView.showAlert("Submission Error", "error", 1000);
                    } else {
                        AlertView.showAlert("Adding To Upload Queue", "info", 1000);
                    }
                }
            ]);
        }
    });
});