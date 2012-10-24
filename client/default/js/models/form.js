var Form = Backbone.Model.extend({

  initialize: function() {
    console.log('Form model init');
  },

  allowedToEdit: function(account) {
    return true;
  }

});