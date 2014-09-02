FormModel = Backbone.Model.extend({
    idAttribute: 'Hash',
    sync: function(method, model, options) {
        if (method == "read") {
            this.loadForm();
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
        _.bindAll(this, "loadForm", "get");
        this.loadForm();
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
                    self.trigger("error", err);
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
                    App.collections.forms.length = formIdArr.length; 
                    options.success(formIdArr);
                }
            });
        }
    }
});

App.collections.forms = new FormsCollection();