PendingItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'pending_submission',
  events: {
    'click button.delete-item': 'delete',
    'click button.submit-item': 'submit',
    'click': 'show'
  },

  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Submit</button><span class="chevron"></span>',
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show', 'delete', 'submit');
    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  },

  delete: function(e) {
    e.stopPropagation();
    this.model.destroy();
    return false;
  },

  submit: function() {
    var self = this;
    self.model.submit(function(err, res) {
        if(err) {
          console.log('Form submission: error :: ' + JSON.stringify(err) + " :: " + JSON.stringify(res));
          switch (err.error) {
            case 'validation':
              App.collections.pending_review.create(self.model.toJSON());
              self.model.destroy();
              break;
            case 'network':
              //Error in act call
              break;
            case 'offline':
            //Offline mode
            default:
              console.log("Unknown Error")
          }
        } else {
          console.log('Form submission: success :: ' + JSON.stringify(res));
          App.collections.pending_submitted.create(self.model.toJSON());
          self.model.destroy();
        }
      }
    );
    return false;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    App.views.form = new PendingView({
      model: this.model
    });
    App.views.form.render();
  }
});