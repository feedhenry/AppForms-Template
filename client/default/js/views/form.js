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
    form.validate({
      highlight: function(element, errorClass, validClass) {
        $(element).closest('div').addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('div').removeClass(errorClass).addClass(validClass);
      }
    });

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
    this.model.pushPage(0);

    this.$el.show();
  },

  unrender: function () {
    // remove custom css, if any
    if (this.theme) {
      this.theme.remove();
    }
    this.model.emptyPageHistory();
    this.$el.hide();
  },

  hide: function () {
    this.unrender();
  },

  previousPage: function () {
    // go to previous page in history
    this.model.popPage();
  },

  nextPage: function () {
    // validate current page first
    var currentPage = this.model.get('active_page');
    var nextPage = currentPage;
    var currentPageView = this.pages[currentPage];
    if (currentPageView.isValid()) {
      // check page rules
      var pageRules = currentPageView.checkRules();
      if (pageRules.skipToPage != null) {
        nextPage = parseInt(pageRules.skipToPage, 10) - 1;
      } else {
        nextPage = currentPage + 1;
      }
      nextPage = Math.min(this.pages.length - 1, nextPage); // make sure we don't go past the last page.
      console.log('next page ', currentPage, '=>', nextPage);
      // only change page if page is different
      if (nextPage !== currentPage) {
        this.model.pushPage(nextPage);
      }
    } else {
      var first_container = this.$el.find('.field_container.error:first');
      var offset = first_container.offset().top - parseInt($('html').css('paddingTop'), 10);
      
      $('html, body').animate({
        scrollTop: offset
      }, 500, function(){
        $('input,select,textarea', first_container).focus();
      });

      // validation errors
      //alert('validation errors');
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