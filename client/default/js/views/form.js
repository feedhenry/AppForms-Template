FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  templates: {
    heading: '<header class="info"><h2 class="form_title"><%= form_title %></h2></header>'
  },

  pages: [],

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();

    this.$el.empty();
    
    var form = $('<form>').addClass('wufoo');
    // Add form heading
    var heading = _.template(this.templates.heading, {
      "form_title": this.model.get('Name')
    });
    form.append(heading);

    // Show steps view?
    if (this.model.pages.length > 0) {
      self.steps = new StepsView({
        parentEl: this.$el,
        parentView: self,
        model: this.model
      });
    }

    // need to call validate before adding rules one by one. Alternative to adding all rules at once
    this.$el.append(form);
    form.validate();

    this.model.pages.each(function (page, index) {
      self.pages.push(new PageView({
        parentEl: form, // pass in form for adding sub views
        parentView: self,
        model: page
      }));
    });

    // TODO: Move to tpl
    var action_bar = $('<div>').addClass('fh_action_bar');

    // temp butan to validate
    action_bar.append($('<button>', {
      "text": "Validate"
    }).bind('click', function (e) {
      e.preventDefault();
      form.valid();
    }));

    // add to DOM
    this.$el.append(action_bar);

    this.$el.show();
  },

  showField: function (id) {
    // TODO: move to page view???
    //this.fieldViews[id].show();
  },

  hideField: function (id) {
    //this.fieldViews[id].hide();
  }

});