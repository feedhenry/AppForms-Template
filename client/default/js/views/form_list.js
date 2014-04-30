
var FormListView = Backbone.View.extend({
  el: $('#fh_wufoo_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click button.reload': 'reload',
    'click #refresh_forms_list': 'reload'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<div class="fh_appform_form_title">Your Forms</div><div class="fh_appform_form_description">Choose a form from the list below</div>',
    error: '<li><button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>',
    footer: '<a class="about fh_appform_form_title" href="#fh_wufoo_banner"><i class="fa fa-info-circle"></i></a><a class="settings fh_appform_field_instructions"><i class="fa fa-cogs"></i></a><br style="clear:both;">',
    refreshForms: '<div id="refresh_forms_list" class="fh_appform_form_title" style="text-align: right;margin-right:20px;font-size:30px;"><i class="fa fa-cloud-download fa-4"></i></div>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm');
    this.views = [];

    App.collections.forms.bind('reset', function(collection, options) {
      if (options == null || !options.noFetch) {
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
      enabledClass: 'fh_appform_button_cancel',
      dataClass: 'fetched'
    });
    $('ul', this.el).append(html);

  },

  render: function() {
    // Empty our existing view
    $(this.el).empty();
    $(this.el).append(this.templates.refreshForms);

    // Add list
    $(this.el).append(this.templates.list);

    if (App.collections.forms.models.length) {
      // Add header
      $('ul', this.el).append(this.templates.header);
      _(App.collections.forms.models).forEach(function(form) {
        this.appendForm(form);
      }, this);
    } else if(App.collections.forms.models.length === 0){
      this.renderErrorHandler("No forms exist for this app.");
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