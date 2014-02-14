$(function() {
  SettingsView = $fh.forms.backbone.ConfigView.extend({
    el: $('#fh_wufoo_settings'),
    events:{
      "click #cancelBtn":"cancel",
      "click #saveBtn":"save"
    },
    buttons:"<div><button type='button' id='cancelBtn'>Cancel</button><button type='button' id='saveBtn'>Save</button></div>",
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