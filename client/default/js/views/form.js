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
    this.render();
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
    form.validate({
      highlight: function(element, errorClass, validClass) {
        $(element).closest('.field_container').addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.field_container').removeClass(errorClass).addClass(validClass);
      },
      errorPlacement: function(error, element) {
        // place error label as last element in containing div
        error.appendTo(element.closest('.field_container'));
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
    console.log("serialized_form :: " + JSON.stringify(serialized_form) + " :: form_hash :: " + form_hash + " :: form_name :: " + form_name);

    // Immediately switch to Home page, send form in background.
    //    self.showHome();
    //    self.showAlert('Submitting your form in the background.', 'success', 3000);
    //    function saveFormData(validation_html) {
    //      //remove original instance of draft/pending form
    //      self.deleteDraft(form_hash, form_ts, function() {
    //        console.log('delete draft successful');
    //      }, function() {
    //        console.log('delete draft failed')
    //      });
    //
    //      self.deletePending(form_hash, form_ts, function() {
    //        console.log('delete pending successful');
    //      }, function() {
    //        console.log('delete pending failed')
    //      });
    //      jQuery('.ts').val("");
    //
    //      self.savePending(form_hash, form_name, serialized_form, function() {
    //        console.log("Form data saved");
    //        self.loadDrafts();
    //        self.loadPending();
    //      }, function() {
    //        console.log("Failed to save form data for form : " + form_hash);
    //      }, validation_html);
    //    }

    //    utils.isOnline(function(online) {
    //      if (online) {
    //        $fh.act({
    //          "act": "postEntry",
    //          "req": {
    //            "form_hash": form_hash,
    //            "data": serialized_form
    //          }
    //        }, function(res) {
    //          alert("res :: " + JSON.stringify(res));
    //          var submitResponseType = self._responseType(res.html);
    //          console.log('submitResponseType: ' + submitResponseType);
    //
    //          if (submitResponseType === 'confirmation') {
    //            console.log('Form submission: confirmation received.');
    //            self.showAlert('A pending form was submitted in the background.', 'success', 3000);
    //
    //            self.deleteDraft(form_hash, form_ts, function() {
    //              console.log('delete draft successful');
    //            }, function() {
    //              console.log('delete draft failed')
    //            });
    //
    //            self.deletePending(form_hash, form_ts, function() {
    //              console.log('delete pending successful');
    //            }, function() {
    //              console.log('delete pending failed')
    //            });
    //            jQuery('.ts').val("");
    //
    //            self.loadPending();
    //            self.loadDrafts();
    //
    //            return;
    //          }
    //
    //          if (submitResponseType === 'validation_error') {
    //            console.log('Form submission: validation error in background.');
    //            self.showAlert('A validation error occured on a form submission. Please review your Pending forms.', 'error');
    //            saveFormData(res.html);
    //            return;
    //          }
    //        }, function(msg, err) {
    //          console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    //          self.showAlert("Due to a poor network connection, submission of your form has failed. We've saved it in your pending items.", 'error');
    //          saveFormData();
    //          self.showHome();
    //        });
    //      } else {
    ////        self.showAlert("We couldn't submit your form at this time. We've saved it in your pending items.", 'error');
    //        alert("offline");
    ////        saveFormData();
    //      }
    //    });
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
  }

});