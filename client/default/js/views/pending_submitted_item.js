PendingSubmittedItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main delete-item second_button">Dismiss</button><span class="chevron"></span>'
  },

  render: function() {
    var time = new moment(this.model.get('submittedDate')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.model.get("formId"),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  } ,

  show: function() {
    App.views.header.hideAll();
    var submission=this.model.coreModel;
    App.views.form=new FormView({
      "parentEl":$("#fh_wufoo_content"),
      "formId":submission.get("formId"),
      "autoShow":true,
      "submission":submission
    });
    App.views.form.readOnly();

  }

});