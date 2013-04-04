/**
 * SentView is required so that the sent items does not get cleared when drafts of sent items are created or
 * when sent items are resubmitted
 *
 * @type {*}
 */
SentView = DraftView.extend({

  hasFieldChanged: function () {
    return false;
  },

  /**
   * clone the current sent item but remove the id so that a
   * new draft instance is created
   */
  saveDraft: function() {
    this.model.load(function (err,actual){
      var clone = actual.toJSON();
      delete clone.id;
      delete clone.Entry;
      delete clone.error;
      App.collections.drafts.create(clone);
      App.views.header.showDrafts();
    });
  },

  /**
   * clone the current sent item but remove the id so that a
   * new pending instance is created
   */
  savePending: function() {
    this.model.load(function (err,actual){
      var clone = actual.toJSON();
      delete clone.id;
      delete clone.error;
      App.collections.pending_submitting.create(clone);
      App.views.header.showPending();
    });
  }

});