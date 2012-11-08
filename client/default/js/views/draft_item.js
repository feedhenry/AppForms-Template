DraftItemView = PendingItemView.extend({

  submit: function() {
    var pending = this.model.toJSON();
    App.collections.pending_submitting.create(pending);
    this.model.destroy();
    return false;
  },

  show: function() {
    App.views.form = new DraftView({
      model: this.model
    });
    App.views.form.render();
  }
});