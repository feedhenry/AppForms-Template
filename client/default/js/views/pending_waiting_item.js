PendingWaitingView = ItemView.extend({

    templates: {
        item: '<td><%= name %></td> <td><%= id %></td><td><%= timestamp %></td><td><button class="button fh_appform_button_cancel button-negative delete-item first_button btn btn-default">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button btn btn-default">Submit</button></td>'
    },
    render: function() {
        var time = new moment(this.model.get('uploadStartDate')).format('HH:mm:ss DD/MM/YYYY');
        var item = _.template(this.templates.item, {
            name: this.model.get('formName'),
            id: this.model.get("formId"),
            timestamp: time
        });

        $(this.$el).html(item);
        return this;
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
                "parentEl": $("#fh_wufoo_content"),
                "formId": submission.get("formId"),
                "autoShow": true,
                "submission": submission
            });
            App.views.form.readOnly();
        });
    }
});