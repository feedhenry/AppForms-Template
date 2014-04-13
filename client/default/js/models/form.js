FormModel = Backbone.Model.extend({
    idAttribute: 'Hash',
    sync: function(method, model, options) {
        if (method == "read") {
            this.loadForm();
        } else {
            console.log("MEH");
        }
    },
    defaults: {
        "Theme": "",
        "Pages": [],
        "Rules": [],
        "active_page": null,
        "page_history": []
    },
    loadForm: function() {
        var formId = this.get("formId");
        var self = this;
        $fh.forms.getForm({
            "formId": formId
        }, function(err, form) {
            if (err) {
                self.trigger("error", err);
            } else {
                self.coreModel = form;
                self.set("fh_full_data_loaded", true);
                self.id = formId;
                self.trigger("change:fh_full_data_loaded");
            }
        });
    },
    get: function(key) {
        var res = Backbone.Model.prototype.get.apply(this, arguments);
        if (res && res !== "") {
            return res;
        } else if (this.coreModel) {
            return this.coreModel.get(key);
        } else {
            return res;
        }
    },
    initialize: function() {
        _.bindAll(this, "loadForm", "get", "handleError");
        this.loadForm();
    },

    handleError: function(e, cb) {
        var type = e.msg || "unknown";
        var err = e.err;
        var msg;
        if (type === "error_ajaxfail") {

            msg = "Unexpected Network Error : "; // + (err ? err.error : "");
            if (!err.error || err.error.length === 0 || err.error === "\"error\"") {
                if (err.message && err.message.length !== 0) {
                    msg += err.message;
                } else {
                    msg += "Unknown";
                }
            } else {
                msg += "Unknown";

            }
            AlertView.showAlert({
                text: msg
            }, "error", 5000);
            return cb({
                error: msg,
                type: "network"
            }, msg);
        }

        if (type === "validation") {
            msg = "Form Validation Error : " + (err ? err : "please fix the errors");
            AlertView.showAlert({
                text: msg
            }, "error", 5000);
            return cb({
                error: msg,
                type: "validation"
            }, e.res || msg);
        }

        if (type === "offline") {
            msg = err || "You are currently offline";
            AlertView.showAlert({
                text: msg
            }, "error", 5000);
            return cb({
                error: msg,
                type: "network"
            }, msg);
        }

        if (type === "network") {
            msg = "Network Error : " + (err || JSON.stringify(e));
            AlertView.showAlert({
                text: msg
            }, "error", 5000);
            return cb({
                error: type,
                type: "network"
            });
        }

        msg = "Unknown Error : " + JSON.stringify(e);
        AlertView.showAlert({
            text: msg
        }, "error", 5000);
        return cb({
            error: msg,
            type: "unknown"
        }, msg);
    }
});

FormsCollection = Backbone.Collection.extend({
    model: FormModel,
    sync: function(method, collection, options) {
        var self = this;
        if (method == "read") {
            $fh.forms.getForms({
                fromRemote: true
            }, function(err, formList) {
                if (err) {
                    self.trigger("error", err.getMessage());
                    options.error(err);
                } else {
                    var count = formList.size();
                    var formIdArr = [];
                    for (var i = 0; i < formList.size(); i++) {
                        var formId = formList.getFormIdByIndex(i);
                        formIdArr.push({
                            formId: formId
                        });
                    }
                    options.success(formIdArr);
                }
            });
        }
    }
});

App.collections.forms = new FormsCollection();