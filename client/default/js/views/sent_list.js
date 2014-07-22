SentListView = SubmissionListview.extend({
    el: $('#fh_content_sent'),

    events: {
        'click button.dismiss-all': 'dismissAll',
        "change #sentSaveMax": "saveMaxSelected"
    },

    templates: {
        dismiss_all: '<button class="col-xs-12 btn btn-danger fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button>',
        save_max: '<label for="sentSaveMax" class="col-xs-6 fh_appform_field_title">Number of sent items to keep</label><select class="fh_appform_field_input form-control col-xs-6" id="sentSaveMax"><%= options%></select>',
        save_max_option: '<option value="<%= value%>"><%= value%></option>'
    },

    initialize: function() {
        _.bindAll(this, 'render', 'appendSentForm', 'changed');

        this.listenTo(App.collections.sent, 'add remove reset sync',  this.changed);

        this.render();
    },
    render: function() {

        // Empty our existing view
        $(this.$el).empty();

        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html()));
        return this;
    },

    saveMaxSelected: function() {
        var self = this;
        var saveMax = parseInt($('#sentSaveMax', this.$el).val(), 10);

        //SHOW MODAL HERE

        if (_.isNumber(saveMax)) {
            $fh.forms.config.set("max_sent_saved", saveMax);
            $fh.forms.config.saveConfig();
            App.collections.sent.clearSentSubmissions(function(err) {
                console.log("Submissions cleared", err);
            });
        }
    },

    show: function() {
        App.views.header.markActive('header_sent', "Sent");
        this.changed();
        this.populate();
        $(this.$el).show();
    },

    populate: function() {
        // Re-render save
        var maxSize = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
        $('#sentSaveMax', this.$el).val(maxSize);
    },

    hide: function() {
        $(this.$el).hide();
    },

    dismissAll: function(e) {
        var self = this;
        e.stopPropagation();



        var confirmDismiss = confirm("Are you sure you want to dismiss all submissions?");
        if (confirmDismiss) {

            var loadingView = new LoadingCollectionView();

            loadingView.show("Removing All Submissions", 10);
            var all = [];

            _(App.collections.sent.models).forEach(function(model) {
                all.push(model);
            });

            var increment = 90 / (all.length ? all.length : 1);
            var incrIndex = 0;

            async.forEachSeries(all, function(model, cb) {
                model.deleteSubmission(function(err) {
                    if (err) {
                        console.error("Error deleting submission: ", err);
                    }
                    incrIndex += 1;
                    console.log("Submission Deleted", model);
                    model.destroy();

                    loadingView.show("Removing Submission " + incrIndex + " of " + all.length, 10 + incrIndex * increment);

                    cb();
                });
            }, function(err) {
                if (err) {
                    console.log(err);
                }

                loadingView.show("All Submissions Removed", 100);
                loadingView.hide();
            });
        }

        return false;
    },

    changed: function() {
        var self = this;

        // Empty our existing view
        $(this.$el).empty();

        var configOptions = $fh.forms.config.get("sent_items_to_keep_list") || [5, 10, 20, 30, 40, 50, 60, 70, 80, 100];
        var empty = App.collections.sent.models.length === 0;

        configOptions = _.map(configOptions, function(sentItem) {
            return _.template(self.templates.save_max_option, {
                value: sentItem
            });
        });


        var optionsHtml = _.template($('#draft-list-option').html(), {
            label: '<label for="sentSaveMax" class="fh_appform_field_title col-xs-12">Number of sent items to keep</label>',
            inputHtml: '<select class="fh_appform_field_input form-control col-xs-12" id="sentSaveMax">' + configOptions + '</select>'
        });

        if (!empty) {
            optionsHtml += _.template($('#draft-list-option').html(), {
                label: '',
                inputHtml: '<button class="col-xs-12 btn btn-danger fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button>'
            });
        }


        //Append Logo
        $(this.$el).append(_.template($('#forms-logo').html()));

        var optionsTemplate = _.template($("#draft-list-options").html(), {
            optionsHtml: optionsHtml,
            hideOptions: empty,
            type: "submitted"
        });

        this.$el.append(optionsTemplate);

        this.$el.find('.panel-heading').click(function(e) {
            console.log(e);

            var type = $(e.currentTarget).data().type;
            $('#submission-options-' + type).slideToggle();
            $('#fh_appform_submission-options-' + type + '-body-icon').toggleClass('icon-chevron-sign-up');
            $('#fh_appform_submission-options-' + type + '-body-icon').toggleClass('icon-chevron-sign-down');
        });

        self.renderGroup(App.collections.sent);

        this.populate();
    },
    appendFunction: function(form, formId) {
        this.appendItemView(form, formId, PendingSubmittedItemView);
    }
});