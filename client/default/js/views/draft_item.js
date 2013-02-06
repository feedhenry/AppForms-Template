DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item second_button">Delete</button><span class="chevron"></span>'
  },

  show: function() {
    this.model.load(function (err,actual ){
      App.views.form = new DraftView({model: new DraftModel(actual.toJSON()) , silent:true});
      App.views.form.render();
    });
  }
});