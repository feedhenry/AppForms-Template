ShowFormButtonView = Backbone.View.extend({
  events: {
    'click button.show': 'show'
  },

  templates: {
    form_button: '<li><button class="show button-block button-main"><%= name %></button></li>',
    pending_button: '<li><button class="show button-block button-main" style="font-size: 12px;text-align: left;padding-left: 10px;"><%= name %><span class="count">10-10-12 15:35:32</span></button></li>',
    draft_button: '<li><button class="show button-block button-main" style="font-size: 12px;text-align: left;padding-left: 10px;"><%= name %><span class="count">10-10-12 15:35:32</span></button></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show');

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var html;

    if (this.model instanceof PendingModel) {
      html = _.template(this.templates.pending_button, {
        name: this.model.get("Name")
      });
    } else if (this.model instanceof DraftModel) {
      html = _.template(this.templates.draft_button, {
        name: this.model.get("Name")
      });
    } else {
      html = _.template(this.templates.form_button, {
        name: this.model.get("Name")
      });
    }


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