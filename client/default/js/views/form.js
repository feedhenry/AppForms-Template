FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  templates: {
    heading: '<header class="info"><h2 class="form_title"><%= form_title %></h2></header>',
    logo: '<h1 id="logo"><a href="#">App Form</a></h1>',
    action_bar: '<div class="fh_action_bar"><button class="previous">Previous Page</button><button class="next">Next Page</button><button class="submit">Submit Form</button></div>'
  },

  initialize: function() {
    var self = this;

    _.bindAll(this, 'render');
    this.model.on('change:active_page', function(model, page) {
      self.activePageChange.call(self, model, page);
    });

    this.pages = [];
  },

  serialize: function() {
    var self = this;
    var serialized_form = {};
    $.each(self.pages, function(i, page) {
      $.extend(serialized_form, page.serialize());
    });
    return serialized_form;
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

    // Add form logo
    var logo = _.template(this.templates.logo, {});
    form.append(logo);

    // Add form heading
    var heading = _.template(this.templates.heading, {
      "form_title": this.model.get('Name')
    });
    form.append(heading);

    // need to call validate before adding rules one by one. Alternative to adding all rules at once
    this.$el.append(form);
    var specialFieldsClassRegex = new RegExp('\\s(address|shortname)\\s');
    form.validate({
      highlight: function(element, errorClass, validClass) {
        var el = $(element);
        el.addClass(errorClass).removeClass(validClass);

        var container = el.closest('.field_container');
        container.addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        var el = $(element);
        el.addClass(validClass).removeClass(errorClass);
        
        var container = el.closest('.field_container');
        // for address group of fields, only remove error class if there are no other error elements inside
        if (!(' ' + container.attr('class') + ' ').match(specialFieldsClassRegex) || container.find('input.error,select.error').length === 0) {
          container.addClass(validClass).removeClass(errorClass);
        }
      },
      errorPlacement: function(error, element) {
        var el = $(element);
        var container = el.closest('.field_container');
        if (!!(' ' + container.attr('class') + ' ').match(specialFieldsClassRegex)) { // append after element
          element.after(error);
        } else {
          error.appendTo(container);
        }
      }
    });

    this.model.pages.each(function(page, index) {
      self.pages.push(new PageView({
        parentEl: form,
        // pass in form for adding sub views
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

    // Show steps view?
    if (this.model.pages.length > 1) {
      self.steps = new StepsView({
        parentEl: this.$el,
        parentView: self,
        model: this.model
      });
    }

    // set active page to be the first one
    this.model.pushPage(0);

    this.$el.show();
  },

  unrender: function() {
    // remove custom css, if any
    if (this.theme) {
      this.theme.remove();
    }
    this.model.emptyPageHistory();
    this.$el.hide();
  },

  hide: function() {
    this.unrender();
  },

  previousPage: function() {
    // go to previous page in history
    this.model.popPage();
  },

  nextPage: function() {
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
      this.focusValidation();
    }
  },

  submit: function() {
    // validate last page before submitting
    var currentPage = this.model.get('active_page');
    var currentPageView = this.pages[currentPage];
    if (currentPageView.isValid()) {
      // submit form
      this.submitForm();
    } else {
      this.focusValidation();
    }
  },

  focusValidation: function () {
    var first_container = this.$el.find('.field_container.error:first');
    var offset = first_container.offset().top - parseInt($('html').css('paddingTop'), 10);

    $('html, body').animate({
      scrollTop: offset
    }, 500, function() {
      $('input,select,textarea', first_container).focus();
    });
  },

  submitForm: function() {
    var self = this;
    var serialized_form = self.serialize();
    var form_hash = this.model.get('Hash');
    var form_name = this.model.get('Name');

    // Immediately switch to Home page, send form in background.
    App.views.header.showHome();
    self.showAlert('Submitting your form in the background.', 'success', 3000);

    this.isOnline(function(online) {
      if (online) {
        $fh.act({
          "act": "postEntry",
          "req": {
            "form_hash": form_hash,
            "data": serialized_form
          }
        }, function(res) {
          console.log("submit resp :: " + JSON.stringify(res));
          if(res.Success && res.Success === 1) {
            console.log('Form submission: success.');
            self.submitSuccess('A pending form was submitted in the background');
          } else {
            console.log('Form submission: error.');
            //ToDO Parse error response properly
            self.submitFailure('A validation error occured on a form submission. Please review your Pending forms.');
          }
        }, function(msg, err) {
          console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
          self.submitFailure("Due to a poor network connection, submission of your form has failed. We've saved it in your pending items.");
        });
      } else {
        self.submitFailure("We couldn't submit your form at this time. We've saved it in your pending items.");
      }
    });
  },

  submitFailure: function(msg) {
    this.showAlert(msg);
    this.savePending();
  },

  submitSuccess: function(msg) {
    this.showAlert(msg);
  },

  saveDraft: function() {
    var draft = this.model.toJSON();
    App.collections.drafts.create(draft);
    App.views.header.showDrafts();
  },

  savePending: function() {
    var pending = this.model.toJSON();
    App.collections.pending.create(pending);
    App.views.header.showPending();
  },

  showAlert:function (message, type, timeout) {
    alert("type ::" + type + " :: message :: " + message);
  },

  activePageChange: function(model, pageIndex) {
    // active page changed, show/hide pages accordingly
    _(this.pages).forEach(function(page, index) {
      if (index === pageIndex) {
        page.show();
      } else {
        page.hide();
      }
    });

  },

  showField: function(id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function(page, index) {
      page.showField(id);
    });
  },

  hideField: function(id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function(page, index) {
      page.hideField(id);
    });
  },

  isOnline: function(callback){
    var online = true;
    //first, check if navigator.online is available
    if(typeof navigator.onLine != "undefined"){
      online = navigator.onLine;
    }
    if(online){
      //use phonegap to determin if the network is available
      if(typeof navigator.network != "undefined" && typeof navigator.network.connection != "undefined"){
        var networkType = navigator.network.connection.type;
        if(networkType == "none" || networkType == null){
          online = false;
        }
      }
    }
    callback(online);
  }

});