PendingSubmittingItemView = PendingItemView.extend({
  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts">Saved: <%= timestamp %></span><button class="button button-positive submit-item second_button">Submit</button><span class="chevron"></span>',
  },
  //Added submit button for test only, remove after

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  }
});