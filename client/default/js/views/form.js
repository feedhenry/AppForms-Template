FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  templates: {
    heading: '<header class="info"><h2 class="form_title"><%= form_title %></h2></header>',
    action_bar: '<div class="fh_action_bar"><button class="previous">Previous Page</button><button class="next">Next Page</button><button class="submit">Submit Form</button></div>'
  },

  initialize: function() {
    var self = this;

    _.bindAll(this, 'render');
    this.model.on('change:active_page', function (model, page) {
      self.activePageChange.call(self, model, page);
    });

    this.pages = [];
    this.render();
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();

    this.$el.empty();

    // add custom theme, if any
    var theme = this.model.get('Theme');
    if (theme != null && theme !== '') {
      self.theme = $('<style>', {
        "type": "text/css",
        "charset": "utf-8",
        "text": theme
      });
      $('body link').last().after(self.theme);
    }
    
    var form = $('<form>').addClass('wufoo');
    // Add form heading
    var heading = _.template(this.templates.heading, {
      "form_title": this.model.get('Name')
    });
    form.append(heading);

    // Show steps view?
    if (this.model.pages.length > 1) {
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

    // add action bar view
    self.action_bar = new ActionBarView({
      parentEl: this.$el,
      parentView: self,
      model: this.model
    });

    // set active page to be the first one
    this.model.set('active_page', 0);

    this.$el.show();
  },

  unrender: function () {
    // remove custom css, if any
    if (self.theme) {
      self.theme.remove();
    }
    // TODO: clean up other shtuff?
  },

  previousPage: function () {
    var currentPage = this.model.get('active_page');
    console.log('previous page:', currentPage);
    currentPage = Math.max(0, currentPage - 1);
    console.log('previous page:', currentPage);
    this.model.set('active_page', currentPage);
  },

  nextPage: function () {
    // validate current page first
    var currentPage = this.model.get('active_page');
    var currentPageView = this.pages[currentPage];
    if (currentPageView.isValid()) {
      console.log('previous page:', currentPage);
      currentPage = Math.max(0, currentPage + 1);
      console.log('previous page:', currentPage);
      this.model.set('active_page', currentPage);
    } else {
      // validation errors
      alert('validation errors');
    }
  },

  submit: function () {
    // validate last page before submitting
    var currentPage = this.model.get('active_page');
    var currentPageView = this.pages[currentPage];
    if (currentPageView.isValid()) {
      // submit form
      alert('submit form');
    } else {
      // validation errors
      alert('validation errors');
    }
  },

  activePageChange: function (model, pageIndex) {
    // active page changed, show/hide pages accordingly
    _(this.pages).forEach(function (page, index) {
      if (index === pageIndex) {
        page.show();
      } else {
        page.hide();
      }
    });

  },

  showField: function (id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function (page, index) {
      page.showField(id);
    });
  },

  hideField: function (id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function (page, index) {
      page.hideField(id);
    });
  }

});