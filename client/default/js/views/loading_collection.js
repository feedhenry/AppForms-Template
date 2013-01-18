LoadingCollectionView = LoadingView.extend({

  initialize: function() {
    var self = this;
    this.formsCounter = -1;
    this.totalCounter = 0;

    LoadingView.prototype.initialize.call(this);

    App.collections.forms.bind('reset', this.formFetch, this);

    App.collections.forms.on('error', function(collection, msg, options) {
      if (collection instanceof Backbone.Collection) {
        self.updateProgress(100);
        self.updateMessage("<p>Your forms couldn't be synced.</p> <p>Please try again later<p>");
        self.addError();

        setTimeout(function() {
          self.hide();
          self.removeError();
        }, 2000);
      }
    }, this);
  },

  formFetch: function(collection, options) {
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
    this.updateMessage("Form list loaded. Loading forms. Loaded " + this.formsCounter + " of " + App.collections.forms.models.length);
  },

  modelLoaded: function(a, b, c) {
    this.percent += 100 / App.collections.forms.length;
    this.updateLoadedCount();
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  modelLoadError: function(model, b, c) {
    model.set('fh_error_loading', true);
    this.percent += 100 / App.collections.forms.length;
    $fh.logger.debug(' !! error loading model. ID: ' + model.id + this.percent);
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  checkTotal: function() {
    var self = this;
    $fh.logger.debug('checkTotal ', this.totalCounter, '/', App.collections.forms.length);
    // Check total loaded to see if we should hide
    if (this.totalCounter >= App.collections.forms.length) {
      this.updateMessage("Form sync complete");
      setTimeout(function() {
        self.hide();
      }, 1000);
    }
  },

  destroyView: function () {
    var self = this;
    App.collections.forms.forEach(function(model) {
      model.off(null, null, self);
    });
    App.collections.forms.off(null, null, this);


    LoadingView.prototype.destroyView.call(self);
  }
});