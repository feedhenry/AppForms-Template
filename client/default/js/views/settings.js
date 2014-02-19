$(function() {
  SettingsView = $fh.forms.backbone.ConfigView.extend({
    el: $('#fh_wufoo_settings'),
    events:{
      "click #cancelBtn":"cancel",
      "click #saveBtn":"save"
    },
    buttons:"<div style='margin: 20px 20px 20px 20px;'><button class='fh_appform_button_cancel' style='width:45%;margin-right:25px;' type='button' id='cancelBtn'>Cancel</button><button class='fh_appform_button_action' style='width:45%;'  type='button' id='saveBtn'>Save</button></div>",
    render:function(){
      SettingsView.__super__.render.apply(this);
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
    save:function(){
      SettingsView.__super__.save.call(this,function(){
        App.views.header.showHome();  
      });
      
    },
    cancel:function(){
      App.views.header.showHome();
    }
  });
});