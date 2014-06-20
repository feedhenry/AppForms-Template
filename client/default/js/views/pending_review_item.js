PendingReviewItemView = ItemView.extend({
    templates: {
        //item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative fh_appform_button_cancel delete-item first_button">Delete</button><button class="button button-positive submit-item fh_appform_button_action second_button">Retry</button>'
        item: '<td><%= name %></td><td><%= id %></td><td><%= timestamp %></td><td><%= error_type %></td><td><button class="button button-negative fh_appform_button_cancel delete-item first_button btn btn-danger">Delete</button><button class="button button-positive submit-item fh_appform_button_action second_button btn btn-primary">Retry</button></td>'
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
        return "Submitted At: " + moment(this.model.get("submitDate")).calendar();
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
                itemText: "Delete",
                itemClass: "delete-item fh_appform_button_cancel"
            },
            {
                itemText: "Edit",
                itemClass: "group-detail fh_appform_button_action"
            },
            {
                itemText: "Submit",
                itemClass: "submit-item fh_appform_button_action"
            }
        ];

        return this.generateButtonHtml(draftButtons);
    }
});