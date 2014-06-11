$(function() {
    SettingsView = $fh.forms.backbone.ConfigView.extend({
        el: $('#fh_content_settings'),
        events: {
            "click #cancelBtn": "cancel",
            "click #saveBtn": "save"
        },
        buttons: "<div class='col-xs-10 col-xs-offset-1'><button class='fh_appform_button_cancel col-xs-6' type='button' id='cancelBtn'>Cancel</button><button class='fh_appform_button_action col-xs-6'  type='button' id='saveBtn'>Save</button></div>",
        render: function() {
            SettingsView.__super__.render.apply(this);
            App.views.header.markActive('heading_settings');
            this.$el.append(this.buttons);
            return this;
        },
        show: function() {
            App.views.header.hideAll();
            this.render();
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