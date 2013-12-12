$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, arguments);
            var self = this;

            this.loadForm(params, function() {
                self.submission.on("savedraft", function(submission) {
                    App.views.header.showDrafts(true);
                    App.views.form = null;
                    App.collections.drafts.fetch();
                });
                self.submission.on("submit", function() {
                    App.views.header.showPending(true);
                    App.views.form = null;
                    App.collections.drafts.fetch();
                    App.collections.pending_waiting.fetch();
                    self.submission.upload(function(err,ut){
                        if (err){
                            alert(err);
                        }
                    });
                });
                self.trigger("loaded");
                if (params.autoShow) {
                    self.render();
                    self.el.show();
                }
            });

        }

    })
});