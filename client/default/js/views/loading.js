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

  show: function() {
    this.reset();
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
    this.updateMessage('Loading Form List');
  },

  hide: function() {
    this.$el.hide();
  },
});