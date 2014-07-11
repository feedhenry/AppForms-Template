PendingSubmittedItemView = ItemView.extend({
    templates: {
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
                parentEl: $("#fh_appform_content"),
                formId: submission.get("formId"),
                autoShow: true,
                submission: submission,
                readOnly: true
            });
        });
    },
    getType: function(){
        return "Submitted";
    },
    getIdText: function(){
        return this.model.get("formId");    
    },
    getItemTime: function(){
        return "Submission Completed At: <br/>" + (new moment(this.model.get('submittedDate')).format('HH:mm:ss DD/MM/YYYY'));    
    },
    getButtons : function(){
        var draftButtons = [
            {
                itemText: "Clear",
                itemClass: "delete-item fh_appform_button_cancel"
            },
            {
                itemText: "View Submission",
                itemClass: "group-detail fh_appform_button_action"
            }
        ];

        return this.generateButtonHtml(draftButtons);
    }

});