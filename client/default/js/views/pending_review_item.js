PendingReviewItemView = PendingItemView.extend({
  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative delete-item second_button">Delete</button><span class="chevron"></span>'
  },

  errorTypes: {
    "validation": "Validation Error. Please review for details.",
    "offline": "Offline during submission. Ok to resubmit",
    "network": "Network issue during submission. Ok to resubmit",
    "defaults": "Unknown Error. Please review for details"
  },

  render: function() {
    var time = new moment(this.model.get('submittedAt')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time,
      error_type: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults
    });

    $(this.el).html(item);
    return this;
  }
});