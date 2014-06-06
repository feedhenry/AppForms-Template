$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, arguments);
            var self = this;

            var submission;

            if (params.form) {
                params.formId = params.form.getFormId();
                submission = params.form.newSubmission();
            }


            if(params.submission){//Dont want to overwrite drafts
              return loadAndRenderForm();
            }




            //THe $fh.act call to get your data can go in here.
            function selectJobId(cb){
              var testData = {"somename":"someValue"};

              return cb(null, testData);
            }

            function findFieldIdByName(fieldName, cb){
              var pages = params.form.getPagesDef();

              for(var pageIndex = 0; pageIndex < pages.length; pageIndex++){
                var fields = pages[pageIndex].fields;
                for(var fieldIndex = 0; fieldIndex < fields.length; fieldIndex++){
                  var field = fields[fieldIndex];
                  console.log(field);
                  if(field.name === fieldName){
                    return cb(field._id);
                  }
                }
              }

              return cb(null);
            }


            function loadAndRenderForm(){
              self.loadForm(params, function() {
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

                self.submission.on("progress", function(progress) {
                  console.log("PROGRESS", progress, this);
                });
                self.submission.on("submitted", function() {
                  console.log("SUBMITTED", this);
                });
                self.submission.on("error", function(errorMessage) {
                  console.log("ERROR", errorMessage);
                });
                self.submission.on("inprogress", function(uploadTask) {
                  console.log("READY FOR UPLOAD ", this, uploadTask);
                });
                self.trigger("loaded");
                if (params.autoShow) {
                  self.$el.show();
                }

                self.render();
              });
            }


            function populateFieldValuesToSubmission(job, cb){

              var fieldsPopulated = 0;
              var fieldsToPopulate = 0;
              var fieldName;

              for(fieldName in job){
                fieldsToPopulate++;
              }

              for(fieldName in job){
                findFieldIdByName(fieldName, function(fieldId){
                  if(fieldId !== null){
                    submission.addInputValue({fieldId: fieldId, value: job[fieldName]}, function(err, valueAdded){
                      console.log("Value added, ", err, valueAdded);
                      fieldsPopulated++;
                    });
                  } else {
                    console.error("No field found with name ", fieldName);
                    fieldsPopulated++;
                  }
                });
              }

              var interval = setInterval(function(){
                if(fieldsPopulated === fieldsToPopulate){
                  clearInterval(interval);
                  return cb();
                }
              }, 500);
            }



            selectJobId(function(err, job){
              populateFieldValuesToSubmission(job, function(){
                params.submission = submission;
                loadAndRenderForm();
              });
            });
        }
    });
});