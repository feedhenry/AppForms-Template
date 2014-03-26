LoadingView = Backbone.View.extend({
  id: 'loading',
  className: 'hidden',

  templates: {
    spinner: '<div id="loading_overlay"></div><div class="loading_container"><div class="loading_spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div>    </div>    <div class="message"></div>    <div class="progress"><div class="bar"></div></div>  </div>'
  },

  initialize: function(model) {
    var self = this;

    this.percent = 0;
    _.bindAll(this, 'destroyView');

    this.$el.html(this.templates.spinner);

    $('body').append(this.$el);

    if (model != null) {
      this.model = model;
      // bind to model change and error events if model not fully loaded yet
      if (!this.model.get('fh_full_data_loaded')) {
        this.model.bind('change:fh_full_data_loaded', self.modelLoaded, self);
        this.model.bind('error', self.modelLoadError, self);
      } else {
        // async behaviour
        setTimeout(function () {
          self.modelLoaded(this.model);
        }, 0);
      }
    }
  },

  modelLoaded: function(a, b, c) {
    var self = this;
    this.model.set('fh_error_loading', false);
    this.updateMessage("Form synced");
    this.updateProgress(100);
    setTimeout(function() {
      self.hide();
    }, 1000);
  },

  modelLoadError: function(model, b, c) {
    var self = this;
    this.model.set('fh_error_loading', true);
    this.updateMessage("Error syncing form");
    this.updateProgress(100);
    setTimeout(function() {
      self.hide();
    }, 1000);
  },

  addError: function() {
    this.$el.addClass('error');
  },

  removeError: function() {
    this.$el.removeClass('error');
  },

  show: function(message,progress) {
    this.reset();

    this.updateMessage(message);
    if (!_.isNumber(progress)) {
      progress =50;
    }
    this.updateProgress(progress); // halfway straight away. only a single step process

    this.$el.show();
  },

  updateMessage: function(message) {
    $('.loading_container .message', this.el).html(message);
  },

  updateProgress: function(progress) {
    $('.loading_container .progress .bar', this.el).css('width', progress + '%');
  },

  reset: function() {
    this.removeError();
    this.updateProgress(1);
    this.updateMessage('');
    this.percent = 0;
    this.formsCounter = -1;
    this.totalCounter = 0;
  },

  hide: function() {
    this.$el.fadeOut(this.destroyView);
  },

  destroyView: function() {
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();

    $(this.el).removeData().unbind();

    if (this.model != null) {
      this.model.off(null, null, this);
    }

    //Remove view from DOM
    this.remove();
    Backbone.View.prototype.remove.call(this);
  }
});