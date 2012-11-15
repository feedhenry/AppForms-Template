LoadingView = Backbone.View.extend({
  el: $('#loading'),

  templates: {},
  percent: 0,
  formsCounter: -1,
  totalCounter: 0,

  initialize: function() {
    var self = this;
    _.bindAll(this, 'render');

    App.collections.forms.bind('reset', _.after(2, this.formFetch), this);

    App.collections.forms.on('error', function(collection, msg, options) {
      App.views.loading.updateProgress(100);
      App.views.loading.updateMessage("Your forms couldn't be synced.");
      self.addError();

      setTimeout(function() {
        self.hide();
        self.removeError();
      }, 2000);
    });

    this.render();
  },

  addError: function() {
    this.$el.addClass('error');
  },

  removeError: function() {
    this.$el.removeClass('error');
  },

  formFetch: function() {
    var self = this;

    // Ignore initial reset
    if (App.collections.forms.models.length > 0) {
      self.updateLoadedCount();

      _(App.collections.forms.models).forEach(function(model) {
        if (!model.get('fh_full_data_loaded')) {
          model.bind('change:fh_full_data_loaded', self.modelLoaded, self);
          model.bind('error', self.modelLoadError, self);
        } else {
          // async behaviour
          setTimeout(function () {
            self.modelLoaded(model);
          }, 0);
        }
      });
    } else {
      this.checkTotal();
    }
  },

  updateLoadedCount: function() {
    this.formsCounter += 1;
    App.views.loading.updateMessage("Form list loaded. Loading forms. Loaded " + this.formsCounter + " of " + App.collections.forms.models.length);
  },

  modelLoaded: function(a, b, c) {
    this.percent += 100 / App.collections.forms.length;
    this.updateLoadedCount();
    this.totalCounter += 1;
    App.views.loading.updateProgress(this.percent);
    this.checkTotal();
  },

  modelLoadError: function(a, b, c) {
    this.percent += 100 / App.collections.forms.length;
    console.log(' !! error loading model. ID: ' + a.id + this.percent);
    this.totalCounter += 1;
    App.views.loading.updateProgress(this.percent);
    this.checkTotal();
  },

  checkTotal: function() {
    var self = this;
    console.log('checkTotal ', this.totalCounter, '/', App.collections.forms.length);
    // Check total loaded to see if we should hide
    if (this.totalCounter === App.collections.forms.length) {
      App.views.loading.updateMessage("Form sync complete");
      setTimeout(function() {
        self.hide();
      }, 1000);
    }
  },

  render: function() {
    var self = this;
  },

  show: function(message) {
    this.reset();

    if (message) {
      this.updateMessage(message);
    } else {
      this.updateMessage('Loading Form List');
    }

    this.$el.show();
  },

  updateMessage: function(message) {
    $('.loading_container .message', this.el).text(message);
  },

  updateProgress: function(progress) {
    $('.loading_container .progress .bar', this.el).css('width', progress + '%');
  },

  reset: function() {
    this.removeError();
    this.updateProgress(1);
  },

  hide: function() {
    this.$el.fadeOut();
  }
});