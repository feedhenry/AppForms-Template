FormListView = Backbone.View.extend({
  el: $('#fh_wufoo_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click .aboutXX': 'showAbout'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<h2>Your Forms</h2><h4>Choose a form from the list below</h4>',
    footer: '<a class="about" href="#fh_wufoo_banner"><img src="img/info.png"></a><a class="settings hidden"><img src="img/settings.png"></a>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm', 'changed');
    self.views = [];

    App.collections.forms.bind('reset', function (collection, options) {
      if (options == null || !options.noFetch) {
        $fh.logger.debug('reset forms collection');
        App.collections.forms.each(function (form) {
          form.fetch();
        });
      }
    });
    App.collections.forms.bind('add remove reset', this.changed, this);

    this.render();
  },

  show: function () {
    App.views.header.markActive('.fh_wufoo_home');
    $(this.el).show();
  },

  hide: function () {
    $(this.el).hide();
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add list
    $(this.el).append(this.templates.list);

    // Add header
    $('ul', this.el).append(this.templates.header);

    _(App.collections.forms.models).forEach(function(form) {
      self.appendForm(form);
    }, this);

    this.$el.append(this.templates.footer);
  },

  appendForm: function(form) {
    var view = new ShowFormButtonView({
      model: form
    });
    self.views.push(view);
    $('ul', this.el).append(view.render().el);
  },

  showSettings: function () {
    App.views.header.showSettings();
  },

  showAbout: function () {
    App.views.header.showAbout();
  }
});