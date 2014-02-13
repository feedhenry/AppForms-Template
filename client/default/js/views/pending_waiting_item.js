PendingWaitingView = ItemView.extend({
  getIdText:function(){
    return "FormId: "+this.model.get("formId");
  },
  getItemTime:function(){
    return "Submit: "+this.model.get("submitDate");
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
    App.views.form.readOnly();
  }
});