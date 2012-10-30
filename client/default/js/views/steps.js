StepsView = Backbone.View.extend({
  className: 'fh_steps',

  templates: {
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    this.options.parentEl.append(this.$el);
    this.$el.append('<h2>Steps</h2>');
  }

});