$(function() {
    SettingsView = $fh.forms.backbone.ConfigView.extend({
        el: $('#fh_content_settings'),
        events: {
            "click #cancelBtn": "cancel",
            "click #saveBtn": "save",
            "click #_refreshFormsButton": "refreshForms",
            'click button.dismiss-all': 'dismissAll',
            "change #sentSaveMax": "saveMaxSelected"
        },
        templates: {
            save_max_option: '<option value="<%= value%>"><%= value%></option>'
        },
        saveMaxSelected: function() {
            var self = this;
            var saveMax = parseInt($('#sentSaveMax', this.$el).val(), 10);

            if (_.isNumber(saveMax)) {
                $fh.forms.config.set("max_sent_saved", saveMax);
                $fh.forms.config.saveConfig();
                App.collections.sent.clearSentSubmissions(function(err) {
                    console.log("Submissions cleared", err);
                });
            }
        },
        dismissAll: function(e) {
            var self = this;
            e.stopPropagation();

            AlertView.confirm({
                message: "Are you sure you want to dismiss all sent submissions?"
            }, function(confirmDismiss){
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
            });

            return false;
        },
        refreshForms: function() {
            var loadingView = new LoadingCollectionView();
            loadingView.show("Reloading Content.", 10);
            $fh.forms.getTheme({
                "fromRemote": true,
                "css": true
            }, function(err, themeCSS) {
                if (err) {
                    $fh.forms.log.e("Error Loading Theme, ", err);
                } else {
                    if ($('#fh_appform_style').length > 0) {
                        $('#fh_appform_style').html(themeCSS);
                    } else {
                        $('head').append('<style id="fh_appform_style">' + themeCSS + '</style>');
                    }
                }

                loadingView.show("Theme Loaded. Now Loading Config", 30);

                $fh.forms.config.refresh(function(err) {
                    if (err) {
                        console.log("Error Loading Config");
                    }

                    loadingView.show("Config Loaded. Now Loading Forms", 40);

                    App.collections.forms.fetch();
                });
            });

        },
        renderSentOptions: function(){
            var self = this;
            var defaultOptions = [5, 10, 20, 30, 40, 50, 60, 70, 80, 100];

            var configOptions = $fh.forms.config.get("sent_items_to_keep_list") || defaultOptions;

            if(configOptions.length === 0){
              configOptions = defaultOptions;
            }


            var empty = false;

            configOptions = _.map(configOptions, function(sentItem) {
                return _.template(self.templates.save_max_option)( {
                    value: sentItem
                });
            });

            var optionsHtml = _.template($('#draft-list-option').html())( {
                label: '<label for="sentSaveMax" class="fh_appform_field_title col-xs-12">Number of sent items to keep</label>',
                inputHtml: '<select class="fh_appform_field_input form-control col-xs-12" id="sentSaveMax">' + configOptions + '</select>'
            });
            
            optionsHtml += _.template($('#draft-list-option').html())( {
                label: '',
                inputHtml: '<button class="col-xs-12 btn btn-danger fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button>'
            });

            this.$el.find('#misc-settings-body').append(optionsHtml);
        },
        render: function() {
            SettingsView.__super__.render.apply(this);
        
            this.renderSentOptions();

            App.views.header.markActive('header_settings', "Settings");

            if ($fh.forms.config.editAllowed()) {
                this.$el.append(_.template($('#config-buttons').html())());
            }
            return this;
        },
        populate: function() {
            // Re-render save
            var maxSize = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
            $('#sentSaveMax', this.$el).val(maxSize);
        },
        show: function() {
            App.views.header.hideAll();
            this.render();
            this.populate();
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        },
        save: function() {
            SettingsView.__super__.save.call(this, function() {
                App.views.header.showHome();
            });

        },
        cancel: function() {
            App.views.header.showHome();
        }
    });
});