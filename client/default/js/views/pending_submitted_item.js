PendingSubmittedItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main delete-item second_button">Dismiss</button><span class="chevron"></span>'
  },

  render: function() {
    var time = new moment(this.model.get('submittedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      id: this.renderId(),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  } ,

  show: function() {
    this.model.load(function (err,actual ){
      App.views.form = new SentView({model: new DraftModel(actual.toJSON())});
      App.views.form.render();
    });

  }

});