ItemView = Backbone.View.extend({
    className: 'fh_appform_field_input',
    events: {
        'click li.delete-item': 'delete',
        'click li.submit-item': 'submit',
        'click li.group-detail': 'show'
    },

    templates: {
        item_failed: '<span class="name <%= screen %>"><%= name %></span><span class="title <%= screen %>"><%= id %></span><span class="ts">Submitted At: <%= timestamp %></span><span class="pending_review_type fh_appform_error <%= error_type %>"><%= error_message %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Retry</button>',
        item: '<span class="name <%= screen %>"><%= name %></span><span class="title <%= screen %>"><%= id %></span><span class="ts"><%= timestamp %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Submit</button>'
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
        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);
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
            buttonHtml += _.template($('#draft-list-item-button').html(), 
                buttonSections[buttonDetail]   
            ); 
        }
        return buttonHtml;
    },

    render: function() {
        var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
        var error = this.model.get('error');
        var template = "#" + "draft-list-item";//this.templates.item;
        if (error && this.templates.item_failed) {
            template = this.templates.item_failed;
        }

        var buttons = _.template($('#draft-list-item-buttons').html(), {
            buttons: this.getButtons(),
            id: this.getIdText()
        });

        buttons = this.getButtons === false ? "": buttons;

        var item = _.template($(template).html(), {
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

    "delete": function(e) {
        var self = this;
        e.stopPropagation();


        var confirmDelete = confirm("Are you sure you want to delete this submission?");
        if (confirmDelete) {
            self.model.loadSubmission(self.model.submissionMeta, function(err) {
                if (err) {
                    $fh.forms.log.e("Error Loading Submission: ", err);
                } else {
                    self.model.coreModel.clearLocal(function(err) {
                        if (err) console.error("Error clearing local: ", err);
                        self.model.destroy();
                        return false;
                    });
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