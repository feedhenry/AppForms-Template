DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="fh_appform_button_cancel button button-negative delete-item second_button">Delete</button><span class="chevron"></span>'
  },

  show: function() {
    App.views.header.hideAll();
    var submission=this.model.coreModel;
    App.views.form=new FormView({
      "parentEl":$("#fh_wufoo_content"),
      "formId":submission.get("formId"),
      "autoShow":true,
      "submission":submission
    });
  },
  getItemTime:function(){
    return "Saved: "+this.model.get("saveDate");
  },
  getIdText:function(){
    return "FormId: "+this.model.get("formId");
  }
});