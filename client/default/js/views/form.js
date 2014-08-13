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
                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        },
        saveToDraft: function() {
          var self = this;
            AlertView.showAlert("Saving Draft", "info", 1000);
            $fh.forms.backbone.FormView.prototype.saveToDraft.apply(this, [
                function(err) {
                    if(err){
                        AlertView.showAlert("Error Saving Draft.", "error", 1000);
                    } else {    
                        refreshSubmissionCollections();
                        self.submission.on("validationerror", self.onValidateError);
                        AlertView.showAlert("Draft Saved", "success", 1000);
                    }
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
                        refreshSubmissionCollections();
                        App.views.header.showHome(true);
                        App.views.form = null;
                        AlertView.showAlert("Adding To Upload Queue", "info", 1000);
                    }
                }
            ]);
        }
    });
});