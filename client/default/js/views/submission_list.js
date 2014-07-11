SubmissionListview = Backbone.View.extend({

  groupSubmissionsByForm: function(submissions){
      //Sorting by formname
      //Already sorted by

      submissions = submissions || [];

      var filteredSubmissions = {};

      _.each(submissions, function(submission){
        var submissionFormName = submission.get('formId');
        if(!filteredSubmissions[submissionFormName]){
          filteredSubmissions[submissionFormName] = [];  
        } 

        filteredSubmissions[submissionFormName].push(submission);
      });

      return filteredSubmissions;
  },
  renderGroup: function(collection){
    var self = this;
    

    var groupedSubmissions = self.groupSubmissionsByForm(collection.models);
    var groupHtml = "";

    if(collection.models.length > 0){
      _.each(groupedSubmissions, function(models, formId){
          var formName = models[0].get('formName');
          var status = collection.status;
          if(status instanceof(Array)){
            status = status[0];
          }
          var group = _.template($('#draft-list-group').html(), {
            formName: formName,
            formId: formId,
            type: status
          });
          group = $(group);

          group.find('.panel-heading').click(function(e){
            console.log(e);

            var formId = $(e.currentTarget).data().formid;
            var type = $(e.currentTarget).data().type;
            $('#drafts-list-panel-' + type + '-' + formId).slideToggle();
            $('#fh_appform_drafts-list-panel-' + type + '-' + formId + '-body-icon').toggleClass('icon-chevron-sign-up');
            $('#fh_appform_drafts-list-panel-' + type + '-' + formId + '-body-icon').toggleClass('icon-chevron-sign-down');
          });

          self.$el.append(group);
          _.each(models, function(model){
              self.appendFunction(model, formId);    
          });
      });  
    } else {
      self.$el.append('<h2 class="text-center col-xs-12">No Submissions</h2>');
    }

    return self;
  },
  appendItemView: function(form, formId, ItemView){
    var view = new ItemView({
        model: form
    });
    $('#drafts-list-group-' + formId, this.$el).append(view.render().$el);
  }
});