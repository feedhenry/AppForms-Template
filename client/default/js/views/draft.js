DraftView = FormView.extend({

  submitFailure: function(msg) {
    console.log("draft submit failure");
    this.showAlert(msg);
    this.model.destroy();
    this.savePending();
  },

  submitSuccess: function(msg) {
    console.log("draft submit success");
    this.showAlert(msg);
    this.model.destroy();
  }

});