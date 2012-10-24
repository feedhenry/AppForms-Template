$fh.ready(function() {

  FormListView = Backbone.View.extend({
    el: $('#fh_wufoo_form_list'),

    events: {
      'click button#add': 'addItem'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');
      this.collection = new FormsCollection();
      this.collection.bind('add', this.appendItem);
      this.counter = 0;
      this.render();
    },

    render: function() {
      console.log('render FormListView');

      this.header = new HeaderView();

      var self = this;
      $(this.el).show();
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item) {
        self.appendItem(item);
      }, this);
    },

    addItem: function() {
      this.counter++;
      var item = new FormModel();
      item.set({
        part2: item.get('part2') + this.counter
      });
      this.collection.add(item);
    },

    appendItem: function(item) {
      $('ul', this.el).append("<li>" + item.get('part1') + " " + item.get('part2') + "</li>");
    }
  });

});