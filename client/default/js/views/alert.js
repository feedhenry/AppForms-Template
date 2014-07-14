AlertView = Backbone.View.extend({
    options: {
        el: $("#fh_appform_alerts_area")
    },

    initialize: function() {},

    render: function(opts) {
        var self = this;

        var alertHtml = _.template($('#alert-entry').html(), {
            alertClass: "alert-info",
            alertMessage: "This is an alert"
        });

        alertHtml = $(alertHtml);

        this.$el.append(alertHtml);

        if (typeof(opts.timeout) === "number") {
            setTimeout(function() {

            }, opts.timeout);
        }

        return this;
    }
});
var alertView = new AlertView(); //{o:o, type:type, timeout:timeout});

AlertView.showAlert = function(o, type, timeout) {
    alertView.render({
        o: o,
        type: type,
        timeout: timeout
    });
};