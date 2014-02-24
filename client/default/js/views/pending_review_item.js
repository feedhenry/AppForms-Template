PendingReviewItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative fh_appform_button_cancel delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Retry</button>'
  },
  errorTypes: {
    "validation": "Validation Error. Please review for details.",
    "offline": "Offline during submission. Ok to resubmit",
    "network": "Network issue during submission. Ok to resubmit",
    "timeout": "Form Submission timeout. Please try again later",
    "defaults": "Unknown Error. Please review for details"
  },
  getIdText: function() {
    return "FormId: " + this.model.get("formId");
  },
  getItemTime: function() {
    return "Submit: " + this.model.get("submitDate");
  },
  show: function() {
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission = self.model.coreModel;
      App.views.form = new FormView({
        "parentEl": $("#fh_wufoo_content"),
        "formId": submission.get("formId"),
        "autoShow": true,
        "submission": submission
      });
    });
  },
  render: function() {
    var time = new moment(this.model.get('submitDate')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.renderId(),
      timestamp: time,
      error_type: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults
    });
    $(this.el).html(item);
    return this;
  }
});