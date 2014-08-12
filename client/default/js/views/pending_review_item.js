PendingReviewItemView = ItemView.extend({
    templates: {
    },
    errorTypes: {
        "validation": "Validation Error. Please review for details.",
        "offline": "Offline during submission. Ok to resubmit",
        "network": "Network issue during submission. Ok to resubmit",
        "timeout": "Form Submission timeout. Please try again later",
        "defaults": "Unknown Error. Please review for details"
    },
    getIdText: function() {
        return "FormId: " + this.model.get("formId");
    },
    getItemTime: function() {
        return "Submitted At: <br/>" + moment(this.model.get("submitDate")).calendar();
    },
    getType: function(){
        return "review";
    },
    show: function() {
        var self = this;
        App.views.header.hideAll();

        self.model.loadSubmission(self.model.submissionMeta, function(err) {
            if (err) {
                $fh.forms.log.e("Error loading submission ", err);
            }
            var submission = self.model.coreModel;
            App.views.form = new FormView({
                "parentEl": $("#fh_appform_content"),
                "formId": submission.get("formId"),
                "autoShow": true,
                "submission": submission
            });
        });
    },
    getButtons : function(){
        var draftButtons = [
            {
                itemText: "Clear",
                itemClass: "delete-item fh_appform_button_cancel"
            },
            {
                itemText: "Edit",
                itemClass: "group-detail fh_appform_button_action"
            }
        ];

        return this.generateButtonHtml(draftButtons);
    }
});