ShowFormButtonView = Backbone.View.extend({
  events: {
    'click button.show': 'show'
  },

  templates: {
    form_button: '<li><button class="show button-block button-main <%= dataClass %>" <%= disabled %>><%= name %></button></li>',
    draft_button: '<li><button class="show button-block button-main" style="font-size: 12px;text-align: left;padding-left: 10px;"><%= name %><span class="count"><%= savedAt %></span></button></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show');

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var html;

    if (this.model instanceof DraftModel) {
      html = _.template(this.templates.draft_button, {
        name: this.model.get("Name"),
        savedAt: this.model.get("savedAt")
      });
    } else {
      var fullyLoaded = this.model.get('fh_full_data_loaded');
      html = _.template(this.templates.form_button, {
        name: this.model.get("Name"),
        disabled: fullyLoaded ? '' : 'disabled="disabled"',
        dataClass: fullyLoaded ? 'fetched': 'fetching'
      });
    }

    this.$el.html(html);
    this.$el.find('button').not('.fh_full_data_loaded');

    return this;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show:function () {
    if (this.model instanceof DraftModel) {
      App.views.form = new DraftView({
        model: this.model
      });
    } else if (this.model instanceof PendingModel) {
      App.views.form = new PendingView({
        model: this.model //new FormModel(this.model.toJSON()) // TODO: should just pass this.model???
      });
    } else {
      App.views.form = new FormView({
        model: this.model
      });
    }
    App.views.form.render();
  }
});