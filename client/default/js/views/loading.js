LoadingView = Backbone.View.extend({
  el: $('#loading'),

  templates: {
  },

  initialize: function() {
    var self = this;
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
  },

  show: function(message) {
    this.reset();

    if (message) {
      this.updateMessage(message);
    } else {
      this.updateMessage('Loading Form List');
    }

    this.$el.show();
  },

  updateMessage: function(message) {
    $('.loading_container .message', this.el).text(message);
  },

  updateProgress: function(progress) {
    $('.loading_container .progress .bar', this.el).css('width',  progress +'%');
  },

  reset: function() {
    this.updateProgress(1);
  },

  hide: function() {
    this.$el.fadeOut();
  },
});