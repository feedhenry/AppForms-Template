ShowFormButtonView = Backbone.View.extend({
  events: {
    'click button.show': 'show'
  },

  templates: {
    form_button: '<li><button class="show button-block button-main <%= dataClass %>" <%= disabled %>><%= name %><div class="loading"></div></button></li>',
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show');

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var html;

    var fullyLoaded = this.model.get('fh_full_data_loaded');
    html = _.template(this.templates.form_button, {
      name: this.model.get("Name"),
      disabled: fullyLoaded ? '' : 'disabled="disabled"',
      dataClass: fullyLoaded ? 'fetched' : 'fetching'
    });

    this.$el.html(html);
    this.$el.find('button').not('.fh_full_data_loaded');

    return this;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    var draft = new DraftModel(this.model.toJSON());
    App.views.form = new DraftView({
      model: draft
    });
    App.views.form.render();
  }
});