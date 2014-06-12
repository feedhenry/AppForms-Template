PendingWaitingView = ItemView.extend({

    templates: {
        item: '<td><%= name %></td> <td><%= id %></td><td><%= timestamp %></td><td><button class="button fh_appform_button_cancel button-negative delete-item first_button btn btn-danger">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button btn btn-primary">Submit</button></td>'
    },
    getIdText: function() {
        return "FormId: " + this.model.get("formId");
    },
    getItemTime: function() {
        return "Submit: " + this.model.get("submitDate");
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
            App.views.form.readOnly();
        });
    }
});