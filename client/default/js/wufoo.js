var WufooController = {
  config: null,
  all_forms: null,

  init: function(config) {
    this.config = config;
    this.bind();

    if (wufoo_config.app_type == 'single_form') {
      // Single form app
      this.getForm();
    } else {
      // Multi-form app
      this.getFormList(true);
    }
  },

  bind: function() {
    var self = this;
    var submitBtn = jQuery('input[type=submit]:visible, button[type=submit]:visible');
    var saveDraftBtn = jQuery("#saveDraftForm");
    if(saveDraftBtn.length == 0){
      saveDraftBtn = jQuery("<button>", {"id": "saveDraftForm", "class": submitBtn.attr("class"), "text":"Save As Draft"});
      submitBtn.before(saveDraftBtn);
    }
    submitBtn.unbind().click(function() {
      self.submitForm();
      return false;
    });

    saveDraftBtn.unbind().click(function (){
      self.saveDraftForm();
      return false;
    })

    jQuery('#fh_wufoo_header .fh_wufoo_home').unbind().click(function() {
      self.showHome();
    });

    jQuery('#fh_wufoo_header .fh_wufoo_drafts').unbind().click(function() {
      self.showDrafts();
    });

    jQuery('#fh_wufoo_header .fh_wufoo_pending').unbind().click(function() {
      self.showPending();
    });
  },

  showHome: function() {
    this.hideAll();
    jQuery('#fh_wufoo_form_list').show();
    this.makeActive('fh_wufoo_home');
  },

  showDrafts: function() {
    this.hideAll();
    jQuery('#fh_wufoo_drafts_list').show();
    this.makeActive('fh_wufoo_drafts');

    this.listDrafts(function(data) {
      console.log(data);
    }, function() {
      console.log('An error occured loading drafts');
    });
  },

  showPending: function() {
    this.hideAll();
    jQuery('#fh_wufoo_pending_list').show();
    this.makeActive('fh_wufoo_pending');

    this.listPending(function(data) {
      console.log(data);
    }, function() {
      console.log('An error occured loading pending');
    });
  },

  hideAll: function() {
    jQuery('#fh_wufoo_content, #fh_wufoo_drafts_list, #fh_wufoo_form_list, #fh_wufoo_pending_list').hide();
  },

  makeActive: function(active_item) {
    jQuery('#fh_wufoo_header').find('.fh_wufoo_home, .fh_wufoo_drafts, .fh_wufoo_pending').removeClass('active');
    jQuery('.' + active_item + '').addClass('active');
  },

  initWufoo: function() {
    var self = this;
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
        self.initFields();
      }
    }, 50);
  },

  serializeForm: function(add_previous_button) {
    var self = this;
    var fields = jQuery('form').serializeArray();
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
      } else if (el.parents().hasClass('fhsig')) {
        // Signature
        field['type'] = "file";
        field['filename'] = "signature";
        field['extension'] = "bmp";
      } else {
        // Regular text field
        field['type'] = "text";
      }
    });

    return fields;
  },

  submitForm: function() {
    var serialized_form = this.serializeForm();
    var self = this;
    var form_hash = jQuery('form').data('form_hash');
    var form_name = jQuery('#header').find('h2').text();
    var saveFormData = function() {
        self.savePending(form_hash, form_name, serialized_form, function() {
          console.log("Form data saved");
        }, function() {
          console.log("Failed to save form data for form : " + form_hash);
        });
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
          self.renderFormHtml(res.html);
          //self.initWufoo();
        }, function(msg, err) {
          console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
          saveFormData();
        });
      } else {
        console.log("Can not submit your form due to network issue. Save it as pending form.");
        saveFormData();
      }
    })

  },

  saveDraftForm: function(){
    var serialized_form = this.serializeForm();
    var self = this;
    var form_hash = jQuery('form').data('form_hash');
    var form_name = jQuery('#header').find('h2').text();
    self.saveDraft(form_hash, form_name, serialized_form, function(){
      console.log("Form saved as draft.");
    }, function(){
      console.log("Failed to save form as draft.");
    });
  },

  renderFormHtml: function(html, show_back_button, form_hash) {
    var self = this;
    this.hideFormList();
    this.showContentArea();
    jQuery('#fh_wufoo_content').html(html);
    this.initWufoo();
    jQuery('form').data('form_hash', form_hash);
    apiController.addApiCalls();
  },

  getForm: function(form_hash) {
    form_hash = form_hash || wufoo_config.form_hash;
    var self = this;

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
      self.initWufoo();
    }, function(msg, err) {
      console.log('Form html load from server failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
      // falling back to cached form, if available
      $fh.data({
        key: "form-" + form_hash
      }, function(res) {
        // got form html from cache, render it
        self.renderFormHtml(res.val, form_hash);
        self.initWufoo();
      }, function(msg, err) {
        //load failed
        console.log('Form html load from cache failed');
        // TODO: alert user?
      });
    });
  },

  clearFormList: function() {
    jQuery('#fh_wufoo_form_list li').remove();
  },

  getFormList: function(load) {
    this.clearFormList();
    var self = this;
    if (load) {
      $fh.act({
        act: 'getForms',
      }, function(res) {
        if (res) {
          self.all_forms = res.data.Forms;
          self.renderFormList(self.all_forms);
        }
      }, function(err) {
        console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
      });
    } else {
      // Show existing form list
      self.showFormList();
      self.hideContentArea();
    }
  },

  renderFormList: function(forms) {
    var self = this;
    self.showFormList();
    self.hideContentArea();

    var form_list = $('#fh_wufoo_form_list');
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
  },

  hideFormList: function() {
    jQuery('#fh_wufoo_form_list').hide();
  },

  hideContentArea: function() {
    jQuery('#fh_wufoo_content').hide();
  },

  showFormList: function() {
    jQuery('#fh_wufoo_form_list').show();
    window.scrollTo(0, 0);
  },

  showContentArea: function() {
    jQuery('#fh_wufoo_content').show();
  },

  initFields: function() {
    var self = this;
    self.specialFields = self.specialFields || {};
    jQuery.each(jQuery('li.fhsig'), function(i, el) {
      var sigField = jQuery(el).sigField({});
      self.specialFields[sigField.getName()] = sigField;
    });
    utils.getLocation(function(location) {
      jQuery.each(jQuery('li.fhmap'), function(i, field) {
        var mapField = jQuery(field).mapField({
          'location': location
        });
        self.specialFields[mapField.getName()] = mapField;
      })
    });
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

  savePending: function(form_id, form_name, form_data, success, error) {
    this.saveData('pending', form_id, form_name, form_data, success, error);
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

  saveData: function(type, form_hash, form_name, form_data, success, error) {
    var entryListId = type + "_" + "forms_list";
    var updatedTime = new Date().getTime();
    var entryId = type + "_" + form_hash + "_" + updatedTime;
    var entryData = {
      data: form_data
    };
    var entryIndexData = {
      ts: updatedTime,
      name: form_name,
      id: form_hash,
      type: type
    };
    var saveFormData = function(done, fail) {
        $fh.data({
          act: 'save',
          key: entryId,
          val: JSON.stringify(entryData)
        }, function() {
          done();
        }, function() {
          fail();
        });
        }
        
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
        form = formData.data;
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
  bindings: ['fhgeo', 'fhcam'],

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
    navigator.camera.getPicture(function(imageData) {
      setTimeout(function() {
        input.parentElement.getElementsByTagName('p')[0].innerHTML = "Picture saved.";
        jQuery(input).val(imageData);
      }, 2000);
    }, function(err) {
      alert('Camera Error: ' + err);
    }, {
      quality: 10,
    });
  },

  //Returns Lat and Long as sting
  fhgeo: function(input) {
    $fh.geoip(function(res) {
      jQuery(input).val('(' + res.latitude + ', ' + res.longitude + ')');
      input.blur();
    }, function(msg, err) {
      input.value = 'Location could not be determined';
    });
  }
};
