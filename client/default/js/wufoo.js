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
      this.getFormList();
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

  submitForm: function() {
    var self = this;
    // Send our images to cloud if they exist
    apiController.sendImages(apiController.images.length);
    $fh.act({
      "act": "submitForm",
      "req": {
        "form_data": jQuery('form').serialize(),
        "form_submission_url": jQuery('form').attr('action')
      }
    }, function(res) {
      self.renderFormHtml(res.html);
      self.initWufoo();
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
    var form_hash = form_hash || wufoo_config.form_hash;
    var self = this;
    $fh.act({
      "act": "getForm",
      "req": {
        "form_hash": form_hash
      }
    }, function(res) {
      self.renderFormHtml(res.html, show_back_button);
      self.initWufoo();
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  },

  getFormList: function() {
    var self = this;
    $fh.act({
      act: 'getForms',
    }, function(res) {
      if (res) {
        self.all_forms = res.data.Forms;
        self.renderFormList(self.all_forms);
      }
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
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
  }
};


var wufoo_controller = WufooController;

$fh.ready(function() {
  if (typeof wufoo_config !== 'undefined') {
    wufoo_controller.init(wufoo_config);
  } else {
    console.log('No Wufoo config available, aborting.');
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
      setTimeout(function(){
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
    for(var i=0; i<neededApis.length; i++){
      var className = neededApis[i].className;
      for(var j=0; j<self.bindings.length; j++){
        if(className.indexOf(self.bindings[j])!==-1){
          var element = neededApis[i].getElementsByTagName('input')[0];
          self.bindFunction(self.bindings[j], neededApis[i]);
        }
      }
    }
  },

  // Binds an API with class name fhXyz call to provided element
  bindFunction: function(fnName, btn) {
    console.log('BIND FN');
    console.log(fnName);
    console.log(btn);

    var inputField = btn.parentElement.getElementsByTagName('input')[0];
    console.log(inputField);

    btn.onclick = function() {
        var input = this.inputField;
        setTimeout(function() {
          apiController[fnName](inputField);
        }, 50);
        return false;
      };


    /*var fn = '';

    function bindFn(element) {
      var button = document.createElement('button');
      var input = element.getElementsByTagName('input')[0];

      // Make sure fields are rendered before styling
      setTimeout(function() {
        input.style.height = '23px';
        button.innerHTML = '<img style="min-height:20px;" src="./img/' + fn + '.png" />'
        button.inputField = element;
        button.style.top = '4px';
        button.style.left = '10px';
        button.style.position = 'relative';
      }, 50);

      jQuery(element.getElementsByTagName('div')[0]).append(button);

      button.onclick = function() {
        var input = this.inputField;
        setTimeout(function() {
          apiController[fn](input);
        }, 50);
        return false;
      };
    }

    switch (className) {
    case 'fhgeo':
      fn = 'fhGeo';
      break;
    case 'fhcam':
      fn = 'fhCam';
      break;
    }

    bindFn(element);*/
  },

  // Open camera and return base64 data
  fhcam: function(input) {
    var field = input.getElementsByTagName('input');

    navigator.camera.getPicture(function(imageData) {
      apiController.images.push({
        data: imageData,
        formUrl: jQuery('form').attr('action').toString(),
        ts: new Date().getTime()
      });
    }, function(err) {
      alert('Camera Error: ' + err);
    }, {
      quality: 10,
    });
  },

  //Returns Lat and Long as sting
  fhgeo: function(input) {
    var field = input.getElementsByTagName('input');
    $fh.geoip(function(res) {
      var str = '';
      str += 'Longitude: ' + res.longitude + ', ';
      str += 'Latitude: ' + res.latitude;
      field[0].value = str;
      field[0].blur();
    }, function(msg, err) {
      field.value = 'Location could not be determined';
    });
  }
};