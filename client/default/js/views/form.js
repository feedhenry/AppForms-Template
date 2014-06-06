$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, arguments);
            var self = this;

            if (params.form) {
                params.formId = params.form.getFormId();
            }

            var submission = self.model.coreModel.newSubmission();

            selectJobId(function(err, job){
                    //job  == json object

                var fieldName = job.key;
                var value = job.value;

                findFieldIdByName("somename", self.model.coreModel, function(fieldId){
                    submission.addInputValue({fieldId: fieldId, value: value}, function(err, res){
                        params.submission = submission;
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
                        
                        
                    });
                })
            });

            

            
        }
    });
});