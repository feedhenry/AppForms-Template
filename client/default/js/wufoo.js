// 06/09/12
//-------------------------------------------------------------
// Bindings available are, fhgeo, fhcam, fhdate, fhtime 
// fhgeo will return lat/lon unless an additional class 'fhgeoEN'
// is defined, in which case easting/northing will be returned
// NOTE: do not use $ for jquery as this will cause errors, use instead jQuery()
//
var WufooController = {
  config: null,
  all_forms: null,

  init: function(config) {
    this.config = config;
    this.bind();
    this.showFormList();
    this.hideContentArea();
    this.getFormList(true);
    $fh.fh_timeout = 120000;
    if (typeof fh_app_version === 'undefined') {
      var fh_app_version = 0;
    }
    jQuery('#app_version').html('Version: ' + fh_app_version);
  },

  showAlert: function(message, type, timeout) {
    var alertTpl = jQuery('<div>').addClass('fh_wufoo_alert');

    alertTpl.addClass(type);
    alertTpl.text(message);

    jQuery('#fh_wufoo_alerts_area').append(alertTpl);

    setTimeout(function() {
      alertTpl.slideUp();
    }, timeout || 10000);
  },

  bind: function() {
    var self = this;
    var submitBtn = jQuery('input[type=submit]:visible');
    var removeBtns = jQuery('.removeThumb');
    var saveDraftBtn = jQuery(".saveDraftForm");
    if (saveDraftBtn.length == 0) {
      saveDraftBtn = jQuery("<button>", {
        "class": submitBtn.attr("class") + ' saveDraftForm',
        "text": "Save As Draft"
      });
      submitBtn.before(saveDraftBtn);
    }
    submitBtn.unbind().click(function() {
      self.submitForm();
      return false;
    });

    saveDraftBtn.unbind().click(function() {
      self.saveDraftForm();
      return false;
    })

    jQuery('#fh_wufoo_header .fh_wufoo_home').unbind().click(function() {
      self.showHome();
      self.getFormList(true);
    });

    jQuery('#fh_wufoo_header .fh_wufoo_drafts').unbind().click(function() {
      self.showDrafts();
    });

    jQuery('#fh_wufoo_header .fh_wufoo_pending').unbind().click(function() {
      self.showPending();
    });

    this.loadDrafts();
    this.loadPending();
  },

  showLoading: function(message) {
    jQuery('#fh_loading').fadeIn();
  },

  hideLoading: function() {
    jQuery('#fh_loading').fadeOut();
  },

  showHome: function() {
    this.hideAll();
    jQuery('.ts').val("");
    jQuery('#fh_wufoo_form_list').show();
    jQuery('#app_version').show();
    this.makeActive('fh_wufoo_home');
    this.showFormList();
  },

  showDrafts: function() {
    this.hideAll();
    jQuery('#fh_wufoo_drafts_list').show();
    this.makeActive('fh_wufoo_drafts');
    this.loadDrafts();
  },

  showPending: function() {
    this.hideAll();
    jQuery('#fh_wufoo_pending_list').show();
    this.makeActive('fh_wufoo_pending');
    this.loadPending();
  },

  loadDrafts: function() {
    var self = this;
    this.listDrafts(function(data) {
      self.renderDrafts(data);
      self.renderDraftsCount(data.length);
    }, function() {
      console.log('An error occured loading drafts');
    });
  },

  formatTimestamp: function(ts) {
    return moment(ts).format("DD-MM-YYYY HH:mm:ss");
  },

  renderDrafts: function(data) {
    var self = this;
    var drafts_list = jQuery('#fh_wufoo_drafts_list');

    // Empty
    drafts_list.find('li').remove();

    jQuery.each(data, function(i, draft) {
      var view_button = jQuery('<button>').text('View').addClass('view').unbind().click(function() {
        self.getDraft(draft.id, draft.ts, function(data) {
          self.hideAll();
          jQuery('.ts').val(draft.ts);
          self.getForm(draft.id, function() {
            self.deserializeForm(data.data);
          }, true);
        });
      });

      var delete_button = jQuery('<button>').text('Delete').addClass('delete').unbind().click(function() {
        self.deleteDraft(draft.id, draft.ts, function() {
          console.log('deleted, reloading drafts');
          self.loadDrafts();
        }, function(err) {
          console.log('draft delete failed');
        });
      });
      var timestamp = self.formatTimestamp(draft.ts);
      var draft_el = jQuery('<li>').text(timestamp + ' - ' + draft.name).append(delete_button).append(view_button).data('form', draft);
      drafts_list.append(draft_el);
    });
  },

  renderDraftsCount: function(count) {
    if (count > 0) {
      jQuery('.fh_wufoo_drafts .count').show().text(count);
    } else {
      jQuery('.fh_wufoo_drafts .count').hide();
    }
  },

  loadPending: function() {
    var self = this;
    this.listPending(function(data) {
      self.renderPending(data);
      self.renderPendingCount(data.length);
    }, function() {
      console.log('An error occured loading pending');
    });
  },

  renderPendingCount: function(count) {
    if (count > 0) {
      jQuery('.fh_wufoo_pending .count').show().text(count);
    } else {
      jQuery('.fh_wufoo_pending .count').hide();
    }
  },

  renderPending: function(data) {
    var self = this;
    var list = jQuery('#fh_wufoo_pending_list');

    // Empty
    list.find('li').remove();

    jQuery.each(data, function(i, pending) {
      var view_button = jQuery('<button>').text('View').addClass('view').unbind().click(function() {
        self.getPending(pending.id, pending.ts, function(data) {
          self.hideAll();
          jQuery('.ts').val(pending.ts);

          // Validation HTML available
          if (data.validation_html) {
            console.log('Validation HTML available, rendering.');
            // Render HTML with validation errors
            self.getForm(pending.id, function() {
              self.deserializeForm(data.data);
            }, true, data.validation_html);
          } else {
            // Fetch form, and deserialize
            console.log('Validation HTML unavailable. Getting form.');
            self.getForm(pending.id, function() {
              self.deserializeForm(data.data);
            }, true);
          }
        });
      });

      var delete_button = jQuery('<button>').text('Delete').addClass('delete').unbind().click(function() {
        self.deletePending(pending.id, pending.ts, function() {
          console.log('deleted, reloading pending');
          self.loadPending();
        }, function(err) {
          console.log('pending delete failed');
        });
      });
      var timestamp = self.formatTimestamp(pending.ts);
      var pending_el = jQuery('<li>').text(timestamp + ' - ' + pending.name).append(delete_button).append(view_button).data('form', pending);
      list.append(pending_el);
    });
  },

  hideAll: function() {
    jQuery('#fh_wufoo_content, #fh_wufoo_drafts_list, #fh_wufoo_form_list, #fh_wufoo_pending_list, #app_version').hide();
  },

  makeActive: function(active_item) {
    jQuery('#fh_wufoo_header').find('.fh_wufoo_home, .fh_wufoo_drafts, .fh_wufoo_pending').removeClass('active');
    jQuery('.' + active_item + '').addClass('active');
  },

  initWufoo: function(target_location) {
    var self = this;
    var i;
    var camFields = jQuery('li.fhcam');

    //make first photoInput visible
    camFields.first().removeAttr('style');
    //Check if multiple photos have been taken already i.e. Drafts/pending forms
    for (i = 0; i < camFields.length; i++) {
      if (camFields.eq(i).find('input').val() != "") {
        camFields.eq(i).removeAttr('style');
      }
    }

    var interval = setInterval(function() {
      if (typeof init !== 'undefined') {
        // Wufoo's Array prototype alteration breaks 
        // PhoneGap, so we remove it.
        if (window.Prototype) {
          delete Array.prototype.toJSON;
        }

        // Wufoo Global - init() - available, 
        // call and clear the interval
        init();
        clearInterval(interval);

        // Bind events
        self.bind();

        // process fields
        self.initFields(target_location);
      }
    }, 50);
  },

  serializeForm: function(add_previous_button) {
    var self = this;
    var fields = jQuery('form').serializeArray();

    // Add nextPageButton to serialized array if exists
    var nextPageButton = jQuery('input[type=submit]');
    if (nextPageButton.length > 0) {
      fields.push({
        name: nextPageButton.attr('name'),
        value: nextPageButton.val()
      })
    }

    var previous_button = jQuery('#previousPageButton');

    if (previous_button.length > 0) {
      // Append previousButton value to serialized form, since submit
      // buttons aren't serialized by default
      fields.push({
        name: 'previousPageButton',
        value: ''
      })
    }

    // Add metadata
    jQuery.each(fields, function(i, field) {

      var el = jQuery('input[name=' + field.name + ']');
      if ((typeof self.specialFields[field.name] != "undefined") && (typeof self.specialFields[field.name].toJSON == "function")) {
        fields[i] = self.specialFields[field.name].toJSON();
      } else if (el.parents().hasClass('fhcam')) {
        // Camera file
        field['type'] = "file";
        field['filename'] = "picture";
        field['extension'] = "jpg";

      } else if (el.siblings(0).children().attr('type') == 'radio') {
        //Radio button field
        field['type'] = 'radio';
      } else if (el.attr('type') == 'checkbox') {
        //Checkbox field
        field['type'] = 'checkbox';
      } else {
        // Regular text field
        field['type'] = "text";
      }
    });

    return fields;
  },

  deserializeForm: function(form) {
    var self = apiController;
    var formObj = jQuery('form');
    // console.log(form);
    jQuery.each(form, function(i, field) {
      if (field.value != null && field.value !== "") {
        var fieldObj = formObj.find('[name=' + field.name + ']');
        if ('file' === field.type) {
          if ('picture' === field.filename) {
            // repopulate hidden input field value
            fieldObj.attr('value', field.value);
            fieldObj.parent().find("p").text("Picture saved.");
            fieldObj.parent().parent().addClass('completePic');
            fieldObj.parent().parent().removeClass('error');
            fieldObj.siblings().eq(1).attr('src', 'data:image/jpg;base64,' + field.value);
            fieldObj.siblings().eq(2).removeAttr('style');
            fieldObj.closest('li').css('display', 'inline-block');
            self.addPicField(fieldObj);

          } else {
            // repopulate signature hidden input field and set image source
            var data = 'data:image/' + field.extension + ';base64,' + field.value;
            fieldObj.attr('value', data);
            fieldObj.parent().find('.sigField img').attr('src', data);
            // Remove the "please reattach this file" error
            var container = fieldObj.parent();
            container.removeAttr('style').removeClass('error');
            container.find('p.error').remove();
          }
        } else if ('map' === field.type) {
          fieldObj.attr('value', field.value);
          var location = field.value.match(/\((.*)?,[\s\S](.*)?\)/);

          fieldObj.parent().mapField({
            'location': {
              'lon': location[2],
              'lat': location[1]
            }
          });

        } else if ('radio' == field.type) {
          jQuery('input:radio[value="' + field.value + '"]').attr('checked', true);

        } else if ('checkbox' == field.type) {
          jQuery('input:checkbox[value="' + field.value + '"]').attr('checked', true);

        } else {
          // repopulate as a text field
          fieldObj.attr('value', field.value);
        }
      }
    });

  },

  submitForm: function() {
    var self = this;
    var serialized_form = this.serializeForm();
    var form_hash = jQuery('form').data('form_hash');
    var form_name = jQuery('#header').find('h2').text();
    var form_ts = jQuery('.ts').val();

    // Immediately switch to Home page, send form in background.
    self.showHome();

    self.showAlert('Submitting your form in the background.', 'success', 3000);

    function saveFormData(validation_html) {
      //remove original instance of draft/pending form
      self.deleteDraft(form_hash, form_ts, function() {
        console.log('delete draft successful');
      }, function() {
        console.log('delete draft failed')
      });

      self.deletePending(form_hash, form_ts, function() {
        console.log('delete pending successful');
      }, function() {
        console.log('delete pending failed')
      });
      jQuery('.ts').val("");

      self.savePending(form_hash, form_name, serialized_form, function() {
        console.log("Form data saved");
        self.loadDrafts();
        self.loadPending();
      }, function() {
        console.log("Failed to save form data for form : " + form_hash);
      }, validation_html);
    };


    utils.isOnline(function(online) {
      if (online) {
        $fh.act({
          "act": "submitForm",
          "req": {
            "form_hash": form_hash,
            "form_data": serialized_form,
            "form_submission_url": jQuery('form').attr('action')
          }
        }, function(res) {
          var submitResponseType = self._responseType(res.html);
          console.log('submitResponseType: ' + submitResponseType);

          if (submitResponseType === 'confirmation') {
            console.log('Form submission: confirmation received.');
            self.showAlert('A pending form was submitted in the background.', 'success', 3000);

            self.deleteDraft(form_hash, form_ts, function() {
              console.log('delete draft successful');
            }, function() {
              console.log('delete draft failed')
            });

            self.deletePending(form_hash, form_ts, function() {
              console.log('delete pending successful');
            }, function() {
              console.log('delete pending failed')
            });
            jQuery('.ts').val("");

            self.loadPending();
            self.loadDrafts();

            return;
          }

          if (submitResponseType === 'validation_error') {
            console.log('Form submission: validation error in background.');
            self.showAlert('A validation error occured on a form submission. Please review your Pending forms.', 'error');
            saveFormData(res.html);
            return;
          }
        }, function(msg, err) {
          console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
          self.showAlert("Due to a poor network connection, submission of your form has failed. We've saved it in your pending items.", 'error');
          saveFormData();
          self.showHome();
        });
      } else {
        self.showAlert("We couldn't submit your form at this time. We've saved it in your pending items.", 'error');
        saveFormData();
      }
    })
  },

  saveDraftForm: function() {
    var serialized_form = this.serializeForm();
    var self = this;
    var form_hash = jQuery('form').data('form_hash');
    var form_name = jQuery('#header').find('h2').text();
    var form_ts = jQuery('.ts').val();

    //remove original instance of draft
    self.deleteDraft(form_hash, form_ts, function() {
      console.log('delete draft successful');
    }, function() {
      console.log('delete draft failed')
    });

    self.deletePending(form_hash, form_ts, function() {
      console.log('delete pending successful');
    }, function() {
      console.log('delete pending failed')
    });
    jQuery('.ts').val('');

    self.saveDraft(form_hash, form_name, serialized_form, function() {
      self.showAlert("Draft saved.", "success");
      self.loadDrafts();
      self.loadPending();
      self.showHome();
    }, function() {
      console.log("Failed to save form as draft.");
    });
  },

  // Categorise a HTML form submission response as "confirmation", "validation_error" or "form"
  _responseType: function(html) {
    var container_html = null;

    jQuery(html).each(function() {
      if (jQuery(this).find('h1#logo').length > 0) {
        container_html = jQuery(this);
      }
    });

    if (container_html.hasClass('confirm')) {
      return "confirmation";
    } else if (container_html.find('#errorLi').length > 0) {
      return "validation_error";
    } else if (container_html.find('form').length > 0) {
      return "form";
    } else {
      return null;
    }
  },

  renderFormHtml: function(html, form_hash) {
    var self = this;
    this.hideFormList();
    this.showContentArea();
    jQuery('#fh_wufoo_content').html(html);
    jQuery('form').data('form_hash', form_hash);
    apiController.addApiCalls();
  },

  getForm: function(form_hash, cb, target_location, validation_html) {
    form_hash = form_hash || wufoo_config.form_hash;
    var self = this;

    self.showLoading();

    // Immediately load form from cache if available
    $fh.data({
      key: "form-" + form_hash
    }, function(res) {
      if (utils.isValid(res.val)) {
        // got form html from cache, render it
        
        if (validation_html) {
          self.renderFormHtml(validation_html, form_hash);
        } else {
          self.renderFormHtml(res.val, form_hash);
        }

        self.initWufoo(target_location);
        self.hideLoading();

        // Fetch in background too.
        $fh.act({
          "act": "getForm",
          "req": {
            "form_hash": form_hash
          }
        }, function(res) {
          // cache html in local storage (asynchronous)
          var html = res.html;
          $fh.data({
            "act": "save",
            "key": "form-" + form_hash,
            "val": html
          }, function() {
            console.log('Form html save ok');
          }, function(msg, err) {
            console.log('Form html save failed:' + msg);
          });
        }, function(msg, err) {
          console.log('Form html load from server failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        });

        if (typeof cb !== 'undefined') {
          return cb();
        }
      } else {
        console.log('Local cache load of form failed, fetching.')
        $fh.act({
          "act": "getForm",
          "req": {
            "form_hash": form_hash
          }
        }, function(res) {
          // cache html in local storage (asynchronous)
          var html = res.html;
          $fh.data({
            "act": "save",
            "key": "form-" + form_hash,
            "val": html
          }, function() {
            console.log('Form html save ok');
          }, function(msg, err) {
            console.log('Form html save failed:' + msg);
          });

          // ok to leave this happen straight away ($fh.data above is asynchronous)
          // as it doesn't depend on the save having completed
          self.renderFormHtml(html, form_hash);
          self.initWufoo(target_location);
          self.hideLoading();
          if (typeof cb !== 'undefined') {
            return cb();
          }
        }, function(msg, err) {
          console.log('Form html load from server failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        });
      }
    });
  },

  clearFormList: function() {
    jQuery('#fh_wufoo_form_list li').remove();
  },

  getFormList: function(load) {
    this.clearFormList();
    var self = this;

    // Load from cache immediately. If there are new forms, refresh and append them later!
    $fh.data({
      act: 'load',
      key: 'all_form_list'
    }, function(cached) {
      if (utils.isValid(cached.val)) {
        self.all_forms = JSON.parse(cached.val);
        self.renderFormList(self.all_forms);
      } else {
        console.log("Can not load form data from server or local cache. If online, will try to fetch anyway.");
      }
    }, function() {
      self.hideLoading();
      console.log("Can not load form data from local cache.");
    });

    if (load) {
      utils.isOnline(function(online) {
        if (online) {
          self.showLoading();
          $fh.act({
            act: 'getForms',
          }, function(res) {
            if (res) {
              self.all_forms = res.data.Forms;
              $fh.data({
                act: 'save',
                key: 'all_form_list',
                val: JSON.stringify(res.data.Forms)
              }, function() {
                console.log("Form data saved");
              });
              self.renderFormList(self.all_forms);
            }
            self.hideLoading();
          }, function(err) {
            self.hideLoading();
            console.log('Cloud call failed with error: Error properties:' + JSON.stringify(err));
          });
        }
      });
    } else {
      // Show existing form list
      self.showFormList();
      self.hideContentArea();
    }
  },

  renderFormList: function(forms) {
    var self = this;

    var form_list = jQuery('#fh_wufoo_form_list');

    // Only render form list if currently visible (user could have switched views)
    if (form_list.is(':visible')) {
      self.hideContentArea();
      form_list.find('.fh_wufoo_form_li').empty();
      // Render buttons for each form
      for (var i = 0; i < forms.length; i++) {
        var form_item = forms[i];
        var list_item = jQuery('<li>').addClass('fh_wufoo_form_li');
        var item_button = jQuery('<button>').addClass('fh_wufoo_form').text(form_item.Name).data('form', form_item).click(function() {
          var form_data = jQuery(this).data('form');
          self.getForm(form_data.Hash);
        });
        list_item.append(item_button);
        form_list.append(list_item);
      }
    }
  },

  hideFormList: function() {
    jQuery('#fh_wufoo_form_list').hide();
  },

  hideContentArea: function() {
    jQuery('#fh_wufoo_content').hide();
  },

  showFormList: function() {
    jQuery('#fh_wufoo_form_list').show();
    jQuery('#app_version').show();
    window.scrollTo(0, 0);
  },

  showContentArea: function() {
    jQuery('#fh_wufoo_content').show();
  },

  initFields: function(target_location) {
    var self = this;
    self.specialFields = self.specialFields || {};
    jQuery.each(jQuery('li.fhsig'), function(i, el) {
      var sigField = jQuery(el).sigField({});
      self.specialFields[sigField.getName()] = sigField;
    });
    if (!target_location) {
      utils.getLocation(function(location) {
        jQuery.each(jQuery('li.fhmap'), function(i, field) {
          var mapField = jQuery(field).mapField({
            'location': location
          });
          self.specialFields[mapField.getName()] = mapField;
        })
      });
    }
  },

  saveDraft: function(form_id, form_name, form_data, success, error) {
    this.saveData('draft', form_id, form_name, form_data, success, error);
  },

  getDraft: function(form_hash, ts, success, error) {
    this.getData("draft", form_hash, ts, success, error);
  },

  listDrafts: function(success, error) {
    this.listData("draft", success, error);
  },

  deleteDraft: function(form_hash, ts, success, error) {
    this.deleteData("draft", form_hash, ts, success, error);
  },

  savePending: function(form_id, form_name, form_data, success, error, validation_html) {
    this.saveData('pending', form_id, form_name, form_data, success, error, validation_html);
  },

  getPending: function(form_hash, ts, success, error) {
    this.getData("pending", form_hash, ts, success, error);
  },

  listPending: function(success, error) {
    this.listData("pending", success, error);
  },

  deletePending: function(form_hash, ts, success, error) {
    this.deleteData("pending", form_hash, ts, success, error);
  },

  saveData: function(type, form_hash, form_name, form_data, success, error, validation_html) {
    var self = this;
    var entryListId = type + "_" + "forms_list";
    var updatedTime = new Date().getTime();
    var entryId = type + "_" + form_hash + "_" + updatedTime;
    var entryData = {
      data: form_data,
      validation_html: validation_html
    };
    var entryIndexData = {
      ts: updatedTime,
      name: form_name,
      id: form_hash,
      type: type
    };

    function saveFormData(done, fail) {
      $fh.data({
        act: 'save',
        key: entryId,
        val: JSON.stringify(entryData)
      }, function() {
        done();
      }, function() {
        fail();
      });
    };

    $fh.data({
      'act': 'load',
      'key': entryListId
    }, function(data) {
      var entryListData = {
        list: []
      };
      if (utils.isValid(data.val)) {
        entryListData = JSON.parse(data.val);
      }
      entryListData.list.push(entryIndexData);
      $fh.data({
        'act': 'save',
        key: entryListId,
        val: JSON.stringify(entryListData)
      }, function() {
        saveFormData(success, error);
      }, error);
    }, error);
  },

  listData: function(type, success, error) {
    var entryListId = type + "_" + "forms_list";
    $fh.data({
      act: 'load',
      key: entryListId
    }, function(data) {
      var list = [];
      if (utils.isValid(data.val)) {
        var listData = JSON.parse(data.val);
        list = listData.list;
      }
      success(list);
    }, error);
  },

  getData: function(type, form_hash, ts, success, error) {
    var entryId = type + "_" + form_hash + "_" + ts;
    $fh.data({
      act: 'load',
      key: entryId
    }, function(data) {
      var form = {};
      if (utils.isValid(data.val)) {
        var formData = JSON.parse(data.val);
        form.data = formData.data;
        form.validation_html = formData.validation_html;
      }
      success(form);
    }, error);
  },

  deleteData: function(type, form_hash, ts, success, error) {
    var entryId = type + "_" + form_hash + "_" + ts;
    $fh.data({
      act: 'remove',
      key: entryId
    }, function() {
      var entryListId = type + "_" + "forms_list";
      $fh.data({
        act: 'load',
        key: entryListId
      }, function(data) {
        if (utils.isValid(data.val)) {
          var listData = JSON.parse(data.val);
          var list = listData.list;
          var foundIndex = -1;
          for (var i = 0; i < list.length; i++) {
            var entry = list[i];
            if (entry.ts == ts && entry.id == form_hash) {
              foundIndex = i;
              break;
            }
          }
          if (foundIndex > -1) {
            list.splice(foundIndex, 1);
          }
          $fh.data({
            act: 'save',
            key: entryListId,
            val: JSON.stringify(listData)
          }, function() {
            success();
          }, error);
        } else {
          success();
        }
      }, error);
    }, error);
  }
};


var wufoo_controller = WufooController;

$fh.ready(function() {
  if (typeof wufoo_config !== 'undefined') {
    wufoo_controller.init(wufoo_config);
  } else {
    alert('No Wufoo config available, aborting.');
  }
});


var apiController = {
  bindings: ['fhgeo', 'fhcam', 'fhdate', 'fhtime', 'fhpics'],

  // Get elements with class $fh and add needed api to click events
  addApiCalls: function() {
    var self = this;
    var neededApis = document.body.getElementsByClassName('apibtn');
    for (var i = 0; i < neededApis.length; i++) {
      var className = neededApis[i].className;
      for (var j = 0; j < self.bindings.length; j++) {
        if (className.indexOf(self.bindings[j]) !== -1) {
          var element = neededApis[i].getElementsByTagName('input')[0];
          self.bindFunction(self.bindings[j], neededApis[i]);
        }
      }
    }
  },

  // Binds an API with class name fhXyz call to provided element
  bindFunction: function(fnName, btn) {
    var inputField = btn.parentElement.getElementsByTagName('input')[0];
    btn.onclick = function() {
      setTimeout(function() {
        apiController[fnName](inputField);
      }, 50);
      return false;
    };
  },

  // Open camera and return base64 data
  fhcam: function(input) {
    var self = this;
    //navigator.camera.getPicture(function(imageData) {
    var imageData = "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";
      setTimeout(function() {
        jQuery(input).parent().find("p").text("Picture saved.");
        jQuery(input).val(imageData);
        jQuery(input).parent().children().eq(2).attr('src', 'data:image/jpg;base64,' + imageData);
        self.addPicField(jQuery(input));
      }, 2000);
    // }, function(err) {
    //   alert('Camera Error: ' + err);
    // }, {
    //   quality: 8
    //   // targetWidth: 100,
    //   // targetHeight: 100
    // });

  },

  //Returns Lat and Long as sting
  fhgeo: function(input) {
    var self = this;
    var inputField = jQuery(input);
    var location;
    var classType;
    $fh.geo(function(res) {
      classType = jQuery(input).parent().parent().attr('class');
      location = res;


      if (classType.indexOf('fhgeoEN') != -1) {
        //convert from lat/lon to eastings/northings
        location = self.convertLocation(location);
        console.log('converted to EN');
        inputField.val('(' + location.easting + ',' + location.northing + ')');
      } else {
        inputField.val('(' + res.lat + ', ' + res.lon + ')');
      } //end of handling output
    }, function(msg, err) {
      input.value = 'Location could not be determined';
    });
    input.blur();
  },

  convertLocation: function(location) {
    var lat = location.lat;
    var lon = location.lon;
    var params = {
      lat: function() {
        return lat
      },
      lon: function() {
        return lon
      }
    };
    return OsGridRef.latLongToOsGrid(params);
  },



  fhdate: function(input) {
    var d = new Date();

    var curr_date = '0' + d.getDate();
    var curr_month = '0' + (d.getMonth() + 1); //Months are zero based
    var curr_year = d.getFullYear();
    var formatDate = curr_date.slice(-2) + '-' + curr_month.slice(-2) + '-' + curr_year;

    jQuery(input).val(formatDate);
    input.blur();
  },


  fhtime: function(input) {
    var d = new Date();

    var sec = '0' + d.getSeconds();
    var min = '0' + d.getMinutes();
    var hour = '0' + d.getHours();
    var formatTime = hour.slice(-2) + ':' + min.slice(-2) + ':' + sec.slice(-2);

    jQuery(input).val(formatTime);
    input.blur();
  },

  fhpics: function(input) {
    var self = this;
    navigator.camera.getPicture(function(imageData) {
      setTimeout(function() {
        jQuery(input).parent().find("p").text("Picture saved.");
        jQuery(input).val(imageData);
        jQuery(input).parent().children().eq(2).attr('src', 'data:image/jpg;base64,' + imageData);
        self.addPicField(jQuery(input));
      }, 2000);
    }, function(err) {
      alert('Camera Error: ' + err);
    }, {
      quality: 8,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
  },

  removeImage: function(item) {
    var self = this;

    // clean up the item for possible reuse later
    item.removeClass('completePic').find('div p:eq(0)').html('Click to upload a picture').end().find('.imageThumb').removeAttr('src').end().find('input').removeAttr('value');

    // only hide the field if it's not required
    if (item.find('span.req').length === 0) {
      item.hide();
    }

    // Must maintain consecutive order on input fields
    // so if there's any empty image fields, move images up^^ to remove gaps
    jQuery('li.fhcam.completePic').each(function() {
      var el = jQuery(this);
      // see if there's an empty slot above us anywhere
      var emptyElAbove = el.prevAll('li.fhcam:not(.completePic)').first();
      if (emptyElAbove.length > 0) {
        var imageData = el.find('input').val();

        // copy image data to empty input above it
        emptyElAbove.addClass("completePic").find('input').val(imageData).end().find('img.imageThumb').attr('src', 'data:image/jpg;base64,' + imageData).end().find('div p').text("Picture Saved").end().css('display', 'inline-block');

        // clean up input below for possible reuse later
        el.removeClass("completePic").find('input').removeAttr("value").end().find('img.imageThumb').removeAttr("src").end().find('div p').text("Click to upload a picture").end().hide();
      }
    });

    // and only show 1 empty image field at the bottom, unless there are more required fields
    jQuery('li.fhcam:not(.completePic)').hide();
    var requiredEmptyEls = jQuery('li.fhcam span.req').closest('li.fhcam:not(.completePic)');
    if (requiredEmptyEls.length > 0) {
      // show all empty els that are required
      requiredEmptyEls.css('display', 'inline-block');
    } else {
      // show the first empty el, which we know is not required
      jQuery('li.fhcam:not(.completePic):eq(0)').css('display', 'inline-block');
    }
  },

  addPicField: function(input) {
    var self = this;
    var li = input.closest('li');

    // mark passed in input as complete
    li.addClass('completePic');

    // tidy up error status on elements, if any
    if (li.hasClass('error')) {
      li.removeClass('error').removeAttr('style').children().eq(2).children().eq(3).removeAttr('style'); // TODO: what's this for?
      li.find('.error').remove();
    }

    // enable remove image button
    li.find('.removeThumb').unbind().bind('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var imageLi = jQuery(this).closest('li');
      self.removeImage(imageLi);
    });

    // shown next available pic field, if there is one, and there isn't already an empty required field above
    if (li.prevAll('.fhcam:not(.completePic)').length === 0) {
      li.nextAll('.fhcam:not(.completePic)').first().css('display', 'inline-block').find('p:eq(0)').text('Click to upload a picture');
    }
  }
};