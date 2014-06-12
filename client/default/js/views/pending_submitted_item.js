PendingSubmittedItemView = ItemView.extend({
    templates: {
        //item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main fh_appform_button_cancel delete-item second_button">Dismiss</button>'
        item: '<td><%= name %></td><td><%= id %></td><td><%= timestamp %></td><td><%= submissionId %></td><td><button class="button button-main fh_appform_button_cancel delete-item btn btn-danger">Dismiss</button></td>'
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
    },
    getIdText: function(){
        return this.model.get("formId");    
    },
    getItemTime: function(){
        return new moment(this.model.get('submittedDate')).format('HH:mm:ss DD/MM/YYYY');    
    }

});