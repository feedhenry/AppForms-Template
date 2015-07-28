AlertView = Backbone.View.extend({
    el: $("#fh_appform_alerts_area"),
    alertClasses: {
        error: 'alert-danger',
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning'
    },

    initialize: function() {},

    render: function(opts) {
        var self = this;

        opts.type = opts.type || "info";

        var alertHtml = _.template($('#alert-entry').html())( {
            alertClass: self.alertClasses[opts.type] || self.alertClasses['info'],
            alertMessage: opts.message
        });

        alertHtml = $(alertHtml);

        this.$el.append(alertHtml);

        if (typeof(opts.timeout) === "number") {
            setTimeout(function() {
                alertHtml.animate({
                    height: 0,
                    opacity: 0
                }, 'slow', function() {
                    alertHtml.remove();
                });
            }, opts.timeout);
        }

        return this;
    }
});
var alertView = new AlertView();

AlertView.showAlert = function(message, type, timeout) {
    alertView.render({
        message: message,
        type: type,
        timeout: timeout
    });
};

/**
 * Allowing the user to confirm an action
 * @param params
 * @param cb
 */
AlertView.confirm = function(params, cb){
    var message = params.message || "Confirm Action";
    if(navigator && navigator.notification && navigator.notification.confirm){
        navigator.notification.confirm(message, function(actionSelected){
            //Call back with whether the action was confirmed or not.
            return cb(actionSelected === 2);
        }, "Confirm Action", ["Cancel", "Confirm"]);
    } else {
        return cb(confirm(message));
    }
};