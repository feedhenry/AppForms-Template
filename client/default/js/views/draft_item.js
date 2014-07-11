DraftItemView = ItemView.extend({

    templates: {
        item: '<td><%= name %></td> <td><%= id %></td> <td><%= timestamp %></td><td><button class="fh_appform_button_cancel button button-negative delete-item second_button btn btn-danger">Delete</button></td>'

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
    getItemTime: function() {
        return "Saved At: <br/>" + moment(this.model.get("_localLastUpdate")).calendar();
    },
    getIdText: function() {
        return this.model.get("_ludid");
    },
    getType: function(){
        return "draft";
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