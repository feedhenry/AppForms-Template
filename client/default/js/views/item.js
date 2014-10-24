ItemView = Backbone.View.extend({
    className: 'list-group-item fh_appform_field_area col-xs-12',
    events: {
        'click button.delete-item': 'delete',
        'click button.submit-item': 'submit',
        'click button.group-detail': 'show'
    },

    templates: {
    },

    errorTypes: {
        "validation": "Validation Error. Please review for details.",
        "offline": "Offline during submission. Ok to resubmit",
        "network": "Network issue during submission. Ok to resubmit",
        "timeout": "Form Submission timeout. Please try again later",
        "defaults": "Unknown Error. Please review for details"
    },

    initialize: function() {
        _.bindAll(this, 'render', 'unrender', 'show', 'delete', 'submit');
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'remove', this.unrender);
    },

    renderId: function() {
        if (this.model.get("Entry") && this.model.get("Entry").EntryId) {
            return "App Forms Id : " + this.model.get("Entry").EntryId;
        }
        if (this.model.idValue) {
            return this.model.idValue;
        }
        if (this.model.id) {
            return this.model.id.split(/-/)[0];
        }
        return "new";
    },

    generateButtonHtml: function(buttonSections){
        var buttonHtml = "";
        for(var buttonDetail in buttonSections){
            buttonHtml += _.template($('#draft-list-item-button').html())( 
                buttonSections[buttonDetail]   
            ); 
        }
        return buttonHtml;
    },

    render: function() {
        var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
        var error = this.model.get('error');
        var template = "#" + "draft-list-item";

        var buttons = _.template($('#draft-list-item-buttons').html())( {
            buttons: this.getButtons(),
            id: this.getIdText()
        });

        buttons = this.getButtons() === false ? false: buttons;

        var item = _.template($(template).html())( {
            name: this.model.get('formName'),
            id: this.getIdText(),
            timestamp: this.getItemTime(),
            error_type: (error && error.type) ? error.type : null,
            error_message: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults,
            buttons: buttons,
            type: this.getType()
        });

        $(this.$el).html(item);
        return this;
    },

    deleteSubmission: function(cb){
        var self = this;

        self.model.deleteSubmission(function(err){
            self.model.destroy();
            if(cb){
                return cb();
            }
        });
    },

    delete: function(e) {
        var self = this;
        e.stopPropagation();


        var confirmDelete = confirm("Are you sure you want to delete this submission?");
        if (confirmDelete) {
            AlertView.showAlert("Deleting Submission", "info", 1000);
            self.deleteSubmission(function(err){
                if(err){
                    AlertView.showAlert("Error deleting submission.", "warning", 1000);
                } else {
                    AlertView.showAlert("Submission Deleted.", "info", 1000);    
                }
            });   
        }
    },
    submit: function(e) {
        var self = this;
        var model = self.model;
        e.stopPropagation();

        self.model.loadSubmission(self.model.submissionMeta, function(err) {
            if (err) {
                $fh.forms.log.e("Error Loading Submission: ", err);
            } else {
                model.coreModel.upload(function(err) {
                    if (err) {
                        $fh.forms.log.e("Error Calling Upload Submission: ", err);
                    }
                    return false;
                });
            }
        });
    },

    unrender: function() {
        $(this.$el).remove();
    },

    show: function() {
        if (this.model.load) {
            this.model.load(function(err, actual) {
                var draft = new DraftModel(actual.toJSON());
                App.views.form = new DraftView({
                    model: draft
                });
                App.views.form.render();
            });
        }
    }
});