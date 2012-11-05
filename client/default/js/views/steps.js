StepsView = Backbone.View.extend({
  className: 'fh_steps clearfix',

  templates: {
    table: '<div class="progress_wrapper"><table class="progress_steps" cellspacing="0"><tr></tr></table></div>',
    step: '<td><span class="number_container"><div class="number"><%= step_num %></div></span><span class="page_title"><%= step_name %></span></td>'
  },

  initialize: function() {
    var self = this;

    _.bindAll(this, 'render');
    this.model.on('change:active_page', function(model, page) {
      self.activePageChange.call(self, model, page);
    });
    this.render();
  },

  render: function() {
    var self = this;
    var table = $(self.templates.table);

    var width = 100 / this.model.pages.length;

    this.model.pages.each(function(page, index) {
      var item = $(_.template(self.templates.step, {
        step_name: page.get('Title'),
        step_num: index + 1
      }));
      item.css('width', width + '%')
      $('tr:first', table).append(item);
    });

    this.$el.append(table);
    $('#logo', this.options.parentEl).after(self.$el);
  },

  activePageChange: function(model, pageIndex) {
    this.$el.find('td').removeClass('active');
    this.$el.find('td:eq(' + pageIndex + ')').addClass('active');
  }

});