$fh.ready(function() {

  ShowFormButtonView = Backbone.View.extend({
    events: {
      'click button.show': 'show'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'show');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      var html = _.template('<li><button class="show"><%= name %></button></li>', {
        name: this.model.get("Name")
      });
      $(this.el).html(html);
      return this;
    },

    unrender: function() {
      $(this.el).remove();
    },

    show: function() {
      console.log('show: ' + this.model.get('Name'));
      var form_view = new FormView({
        model: this.model
      });
    }
  });

});