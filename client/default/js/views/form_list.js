
var FormListView = Backbone.View.extend({
  el: $('#fh_wufoo_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click button.reload': 'reload'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<h2>Your Forms</h2><h4>Choose a form from the list below</h4>',
    error: '<li><button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>',
    footer: '<a class="about" href="#fh_wufoo_banner"><img src="img/info.png"></a><a class="settings hidden"><img src="img/settings.png"></a>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm');
    this.views = [];

    App.collections.forms.bind('reset', function(collection, options) {
      if (options == null || !options.noFetch) {
        $fh.logger.debug('reset forms collection');
        App.collections.forms.each(function(form) {
          form.fetch();
        });
      }
    });
    App.collections.forms.bind('add remove reset error', this.render, this);
  },

  reload: function() {
    var loadingView = new LoadingCollectionView();
    loadingView.show("Attempting to reload forms");
    App.router.reload();
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_home');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  renderErrorHandler: function(msg) {
    try {
      if (msg == null || msg.match("error_ajaxfail")) {
        msg = "An unexpected error occurred.";
      }
    } catch (e) {
      msg = "An unexpected error occurred.";
    }
    var html = _.template(this.templates.error, {
      name: msg + "<br/>Please Retry Later",
      enabledClass: 'button-negative',
      dataClass: 'fetched'
    });
    $('ul', this.el).append(html);

  },

  render: function() {
    // Empty our existing view
    $(this.el).empty();

    // Add list
    $(this.el).append(this.templates.list);

    if (App.collections.forms.models.length) {
      // Add header
      $('ul', this.el).append(this.templates.header);
      _(App.collections.forms.models).forEach(function(form) {
        this.appendForm(form);
      }, this);
    } else {
      this.renderErrorHandler(arguments[1]);
    }
    this.$el.append(this.templates.footer);
  },

  appendForm: function(form) {
    var view = new ShowFormButtonView({
      model: form
    });
    this.views.push(view);
    $('ul', this.el).append(view.render().el);
  },

  showSettings: function() {
    App.views.header.showSettings();
  },

  showAbout: function() {
    App.views.header.showAbout();
  }
});