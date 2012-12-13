DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item second_button">Delete</button><span class="chevron"></span>'
  },

  show: function() {
    App.views.form = new DraftView({
      model: new DraftModel(this.model.toJSON())
    });
    App.views.form.render();
  }
});