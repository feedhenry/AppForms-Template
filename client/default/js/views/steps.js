StepsView = Backbone.View.extend({
  className: 'fh_steps clearfix',

  templates: {
    item: '<li><span class="step-name"><%= step_name %></span><span class="step-num"><%= step_num %></span></li>'
  },

  initialize: function() {
    var self = this;

    _.bindAll(this, 'render');
    this.model.on('change:active_page', function (model, page) {
      self.activePageChange.call(self, model, page);
    });
    this.render();
  },

  render: function() {
    var self = this;
    this.options.parentEl.append(this.$el);
    var list = $('<ol>').addClass('wizard-progress clearfix');

    this.model.pages.each(function (page, index) {
      var item = $(_.template(self.templates.item, {
        step_name: page.get('Title'),
        step_num: index + 1
      }));

      if (index === 0) {
        item.addClass('active-step');
      }
      list.append(item);
    });

    this.$el.append(list);
  },

  activePageChange: function (model, pageIndex) {
    // TODO
  }

});