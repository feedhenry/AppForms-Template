LoadingCollectionView = LoadingView.extend({

    initialize: function() {
        var self = this;
        this.formsCounter = -1;
        this.totalCounter = 0;

        LoadingView.prototype.initialize.call(this);

        this.listenTo(App.collections.forms, 'sync', this.formFetch);

        this.listenTo(App.collections.forms, 'error', function(collection, msg, options) {
            if (collection instanceof Backbone.Collection) {
                self.updateProgress(100);
                self.updateMessage("<p>Your forms couldn't be synced.</p> <p>Please try again later<p>");
                self.addError();

                setTimeout(function() {
                    self.hide();
                    self.removeError();
                    App.views.header.showHome();
                }, 2000);
            }
        });
    },

    formFetch: function(collection, options) {
        var self = this;

        // Ignore initial reset
        if (App.collections.forms.models.length > 0) {
            self.updateLoadedCount();

            _(App.collections.forms.models).forEach(function(model) {
                if (!model.get('fh_full_data_loaded')) {
                    model.on('change:fh_full_data_loaded', self.modelLoaded, self);
                    model.on('error', self.modelLoadError, self);
                } else {
                    self.modelLoaded(model);
                }
            });
        } else {
            this.checkTotal();
        }
    },

    updateLoadedCount: function() {
        this.formsCounter += 1;
        this.updateMessage("Loading Form " + this.formsCounter + " of " + App.collections.forms.models.length);
    },

    modelLoaded: function(a, b, c) {
        this.percent += 100 / App.collections.forms.length;
        if (this.percent > 100) this.percent = 100;
        this.updateLoadedCount();
        this.totalCounter += 1;
        this.updateProgress(this.percent);
        this.checkTotal();
    },

    modelLoadError: function(model, b, c) {
        model.set('fh_error_loading', true);
        this.percent += 100 / App.collections.forms.length;
        if (this.percent > 100) this.percent = 100;
        this.totalCounter += 1;
        this.updateProgress(this.percent);
        this.checkTotal();
    },

    checkTotal: function() {
        var self = this;
        // Check total loaded to see if we should hide
        if (this.totalCounter >= App.collections.forms.length) {
            this.updateMessage("Form sync complete");
            setTimeout(function() {
                App.views.header.showHome();
                self.hide();
            }, 1000);
        }
    },

    destroyView: function() {
        var self = this;
        App.collections.forms.forEach(function(model) {
            model.off(null, null, self);
        });
        App.collections.forms.off(null, null, this);


        LoadingView.prototype.destroyView.call(self);
    }
});