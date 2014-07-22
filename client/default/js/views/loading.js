LoadingView = Backbone.View.extend({
    id: 'loading',
    className: '',

    templates: {
        spinner: '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>'
    },

    initialize: function(model) {
        var self = this;

        this.percent = 0;
        _.bindAll(this, 'destroyView', "modelLoaded");

        $('#myModal').modal();

        if (model != null) {
            this.model = model;
            // bind to model change and error events if model not fully loaded yet
            if (!this.model.get('fh_full_data_loaded')) {
                this.listenTo(this.model, 'change:fh_full_data_loaded', self.modelLoaded);
                this.listenTo(this.model, 'error', self.modelLoadError);
            } else {
                // async behaviour
                setTimeout(function() {
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
        $('#myModal .progress-bar').addClass('progress-bar-danger');
    },

    removeError: function() {
        $('#myModal .progress-bar').removeClass('progress-bar-danger');
    },

    show: function(message, progress) {
        this.reset();

        this.updateMessage(message);
        if (!_.isNumber(progress)) {
            progress = 20;
        }
        this.updateProgress(progress); // halfway straight away. only a single step process

        this.$el.show();
    },

    updateMessage: function(message) {
        $('#myModalLabel').html(message);
    },

    updateProgress: function(progress) {
        $('#myModal .progress-bar').css('width', progress + '%');
    },

    reset: function() {
        this.removeError();
        this.updateProgress(5);
        this.updateMessage('');
        this.percent = 0;
        this.formsCounter = -1;
        this.totalCounter = 0;
    },

    hide: function() {
        var self = this;
        setTimeout(function(){
            $('#myModal').modal('hide');   
            self.destroyView(); 
        }, 500);
    },

    destroyView: function() {
        $(this.$el).removeData().unbind();

        if (this.model != null) {
            this.model.off(null, null, this);
        }

        //Remove view from DOM
        this.remove();
        Backbone.View.prototype.remove.call(this);
    }
});