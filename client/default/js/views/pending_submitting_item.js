PendingSubmittingItemView = ItemView.extend({
  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
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
  },

  show: function() {
    //TODO: Impl?
    $fh.logger.debug('show for submitting not implemented');
  }
});