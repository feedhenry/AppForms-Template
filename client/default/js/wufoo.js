var WufooController = {
  config: null,
  all_forms: null,

  init: function(config) {
    this.config = config;

    if (wufoo_config.app_type == 'single_form') {
      // Single form app
      this.getForm();
    } else {
      // Multi-form app
      this.getFormList(true);
    }
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

  bind: function() {
    var self = this;
    jQuery('input[type=submit]:visible, button[type=submit]:visible').unbind().click(function() {
      self.submitForm();
      return false;
    });
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
      if((typeof self.specialFields[field.name] != "undefined") && (typeof self.specialFields[field.name].toJSON == "function")){
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
    console.log(serialized_form);
    var self = this;
    apiController.sendImages(apiController.images.length);
    $fh.act({
      "act": "submitForm",
      "req": {
        "form_data": serialized_form,
        "form_submission_url": jQuery('form').attr('action')
      }
    }, function(res) {
      self.renderFormHtml(res.html);
      //self.initWufoo();
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  },

  renderFormHtml: function(html, show_back_button) {
    var self = this;
    this.hideFormList();
    this.showContentArea();
    jQuery('#fh_wufoo_content').html(html);
    this.initWufoo();
    if (show_back_button) {
      // Inject a back button
      var back_button = jQuery('<a>').attr('href', '#').text('Back To Form List').addClass('fh_wufoo_formlist_btn').click(function() {
        self.getFormList(false);
        jQuery(this).remove();
        return false;
      });
      jQuery('body').prepend(back_button);
    }
    apiController.addApiCalls();
  },

  getForm: function(form_hash, show_back_button) {
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
      self.renderFormHtml(html, show_back_button);
      self.initWufoo();
    }, function(msg, err) {
      console.log('Form html load from server failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
      // falling back to cached form, if available
      $fh.data({
        key: "form-" + form_hash
      }, function(res) {
        // got form html from cache, render it
        self.renderFormHtml(res.val, show_back_button);
        self.initWufoo();
      }, function(msg, err) {
        //load failed
        console.log('Form html load from cache failed');
        // TODO: alert user?
      });
    });
  },

  getFormList: function(load) {
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
        self.getForm(form_data.Hash, true);
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
    jQuery.each(jQuery('li.fhsig'), function(i, el){
      var sigField = jQuery(el).sigField({});
      self.specialFields[sigField.getName()] = sigField;
    });
    utils.getLocation(function(location){
      jQuery.each(jQuery('li.fhmap'), function(i, field){
        var mapField = jQuery(field).mapField({'location': location});
        self.specialFields[mapField.getName()] = mapField;
      })
    });
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


/**************** API Binding Code ******************/

var config = {
  fields: [],
};

var apiController = {
  bindings: ['fhgeo', 'fhcam'],
  progressWidth: 0,
  images: [],

  //If we have images send them, else return
  sendImages: function(count) {
    var self = this;
    // We have no images or sent all, end sending, hide progress
    if (!self.images || self.images.length === 0) {
      setTimeout(function() {
        jQuery('#fh_wufoo_progressbar').hide();
      }, 2000);
      return;
    }
    // First call to send images, show progress bar
    if (count) {
      self.progressWidth = jQuery('#fh_wufoo_progressbar').width() / count;
      jQuery('#progress').width(0);
      jQuery('#fh_wufoo_progressbar').show();
    }

    $fh.act({
      act: 'postPicture',
      req: {
        ts: self.images[0].ts,
        formUrl: self.images[0].formUrl,
        data: self.images[0].data
      }
    }, function(res) {
      // Remove image at index 0 and send next image in queue(array)
      apiController.images.splice(0, 1);
      jQuery('#progress').width(jQuery('#progress').width() + self.progressWidth);
      self.sendImages();
    }, function(msg, err) {
      alert('Uploading an image failed');
      self.sendImages();
    });
  },

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
      apiController.images.push({
        data: imageData,
        formUrl: jQuery('form').attr('action').toString(),
        ts: new Date().getTime()
      });
      input.parentElement.getElementsByTagName('p')[0].innerHTML = "Picture saved. Thank You!"
    }, function(err) {
      alert('Camera Error: ' + err);
    }, {
      quality: 10,
    });
  },

  //Returns Lat and Long as sting
  fhgeo: function(input) {
    $fh.geoip(function(res) {
      var str = '';
      str += 'Longitude: ' + res.longitude + ', ';
      str += 'Latitude: ' + res.latitude;
      input.value = str;
      input.blur();
    }, function(msg, err) {
      input.value = 'Location could not be determined';
    });
  }
};
