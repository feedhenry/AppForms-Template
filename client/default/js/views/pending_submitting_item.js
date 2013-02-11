PendingSubmittingItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
  },
  //Added submit button for test only, remove after

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      id: this.renderId(),
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