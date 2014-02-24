PendingSubmittedItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main fh_appform_button_cancel delete-item second_button">Dismiss</button>'
  },

  render: function() {
    var time = new moment(this.model.get('submittedDate')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.model.get("formId"),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  } ,

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