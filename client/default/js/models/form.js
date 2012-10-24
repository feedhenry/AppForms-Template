(function($) {

  var Form = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var Forms = Backbone.Collection.extend({
    model: Form
  });
  
})(jQuery);
