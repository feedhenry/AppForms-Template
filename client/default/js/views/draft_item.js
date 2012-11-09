DraftItemView = PendingItemView.extend({

  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item second_button">Delete</button><span class="chevron"></span>',
  },


  submit: function() {
     App.collections.pending_submitting.add(this.model);
     App.collections.drafts.remove(this.model);
    return false;
  },

  show: function() {
    App.views.form = new DraftView({
      model: this.model
    });
    App.views.form.render();
  }
});