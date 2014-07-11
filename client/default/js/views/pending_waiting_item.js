PendingWaitingView = ItemView.extend({
    templates: {
    },
    getIdText: function() {
        return "FormId: " + this.model.get("formId");
    },
    getItemTime: function() {
        return "Submitted: <br/>" + (new moment(this.model.get("submitDate")).format('HH:mm:ss DD/MM/YYYY'));  
    },
    show: function() {
        var self = this;
        App.views.header.hideAll();

        self.model.loadSubmission(self.model.submissionMeta, function(err) {
            if (err) {
                $fh.forms.log.e("Error loading submission ", err);
            }

            var submission = self.model.coreModel;

            submission.changeStatus("draft", function(){
                    App.views.form = new FormView({
                    "parentEl": $("#fh_appform_content"),
                    "formId": submission.get("formId"),
                    "autoShow": true,
                    "submission": submission,
                    readOnly: false
                });    
            });
        });
    },
    getButtons : function(){
        var draftButtons = [
            {
                itemText: "Edit",
                itemClass: "group-detail fh_appform_button_action"
            },
            {
                itemText: "Clear",
                itemClass: "delete-item fh_appform_button_cancel"
            },
            {
                itemText: "Submit",
                itemClass: "submit-item fh_appform_button_action"
            }
        ];

        return this.generateButtonHtml(draftButtons);
    },
    getType: function(){
        return "Pending";
    }
});