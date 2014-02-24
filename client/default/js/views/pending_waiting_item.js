PendingWaitingView = ItemView.extend({
  getIdText:function(){
    return "FormId: "+this.model.get("formId");
  },
  getItemTime:function(){
    return "Submit: "+this.model.get("submitDate");
  },
  show: function() {
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err, submission){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }

      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_wufoo_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
      App.views.form.readOnly();
    });
  }
});