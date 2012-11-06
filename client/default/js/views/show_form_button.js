ShowFormButtonView = Backbone.View.extend({
  events: {
    'click button.show': 'show'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show');

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var html = _.template('<li><button class="show button-block button-positive"><%= name %></button></li>', {
      name: this.model.get("Name")
    });
    $(this.el).html(html);
    return this;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show:function () {
    if (this.model instanceof PendingModel) {
      App.views.form = new PendingView({
        model:this.model
      });
    } else if (this.model instanceof DraftModel) {
      App.views.form = new DraftView({
        model:this.model
      });
    } else {
      App.views.form = new FormView({
        model:this.model
      });
    }
    App.views.form.render();
  }
});