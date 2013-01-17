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
    var clone = this.model.toJSON();
    delete clone.id;
    App.collections.drafts.create(clone);
    App.views.header.showDrafts();
  },

  /**
   * clone the current sent item but remove the id so that a
   * new pending instance is created
   */
  savePending: function() {
    var clone = this.model.toJSON();
    delete clone.id;
    App.collections.pending_submitting.create(clone);
    App.views.header.showPending();
  }

});