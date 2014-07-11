$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            var self = this;
            self.options = params || {};
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, params);


            if (params.form) {
                params.formId = params.form.getFormId();
            }

            this.loadForm(params, function() {
                self.submission.on("savedraft", function(submission) {
                    App.views.header.showDrafts(true);
                    App.views.form = null;
                    refreshSubmissionCollections();
                });
                self.submission.on("submit", function() {
                    App.views.header.showPending(true);
                    App.views.form = null;
                    refreshSubmissionCollections();
                });

                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        },
        saveToDraft: function(){
            var loadingView = new LoadingCollectionView();

            loadingView.show("Saving Draft", 10);

            $fh.forms.backbone.FormView.prototype.saveToDraft.apply(this, [function(){
                loadingView.show("Draft Saved", 100); 
                App.views.header.showHome();
                loadingView.hide();      
            }]);
        },
        submit: function(){
            var loadingView = new LoadingCollectionView();

            loadingView.show("Processing Submission", 10);  

            $fh.forms.backbone.FormView.prototype.submit.apply(this, [function(err){
                if(err){
                    console.log(err);
                    loadingView.show("Submission Error", 100); 
                    loadingView.addError();
                    loadingView.hide(); 
                } else {
                    loadingView.show("Adding To Upload Queue", 100); 
                    App.views.header.showHome();
                    loadingView.hide();      
                }
            }]);   
        }
    });
});