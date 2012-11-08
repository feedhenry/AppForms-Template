PendingReviewItemView = PendingItemView.extend({
  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts">Submitted At: <%= timestamp %></span><br/><span style="position: inherit; margin: 10px 0 0 10px;" class="count-negative">Validation Error</span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Submit</button><span class="chevron"></span>',
  },

  render: function() {
    var time = new moment(this.model.get('submittedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  }
});