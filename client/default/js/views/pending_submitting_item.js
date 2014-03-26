PendingSubmittingItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
  },
  //Added submit button for test only, remove after

  render: function() {
    var time = new moment(this.model.get('uploadStartDate') || new Date()).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.model.get("formId"),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  }
});