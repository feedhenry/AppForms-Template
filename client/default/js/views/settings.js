$(function() {
    SettingsView = $fh.forms.backbone.ConfigView.extend({
        el: $('#fh_content_settings'),
        events: {
            "click #cancelBtn": "cancel",
            "click #saveBtn": "save",
            "click #_refreshFormsButton": "refreshForms"
        },
        refreshForms: function(){
            var loadingView = new LoadingCollectionView();
            loadingView.show("Reloading Content.", 10);
            $fh.forms.getTheme({
                    "fromRemote": true,
                    "css": true
            }, function(err, themeCSS) {
                if(err){
                    $fh.forms.log.e("Error Loading Theme, ", err);
                } else{
                    // if ($('#fh_appform_style').length > 0) {
                    //     $('#fh_appform_style').html(themeCSS);
                    // } else {
                    //     $('head').append('<style id="fh_appform_style">' + themeCSS + '</style>');
                    // }
                }  

                loadingView.show("Theme Loaded. Now Loading Forms", 40);


                App.collections.forms.fetch(); 
            });
            
        },
        render: function() {
            SettingsView.__super__.render.apply(this);
            App.views.header.markActive('heading_settings');

            if($fh.forms.config.editAllowed()){
                this.$el.append(_.template($('#config-buttons').html()));    
            }
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