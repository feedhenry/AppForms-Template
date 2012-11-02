PendingView = FormView.extend({

  submitFailure: function(msg) {
    console.log("pending submit failure");
    this.showAlert(msg);
    this.model.destroy();
    this.savePending();
  },

  submitSuccess: function(msg) {
    console.log("pending submit success");
    this.showAlert(msg);
    this.model.destroy();
  },

  saveDraft: function() {
    App.collections.drafts.create(this.model.toJSON());
    this.model.destroy();
    App.views.header.showDrafts();
  }

});