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
  images: [],

  // get image daat from device as base 64 then upload (win function)
  getImageData: function(imageObj, win, fail) {
    // Create a file reader
    var reader = new FileReader();

    // On load complete we return the resulting data
    reader.onload = function(evt) {
      if (evt.target.result && evt.target.result !== null && evt.target.result !== '') {
        // Data is two chunks comma seperated so get data by splitting at comma
        var dataStr = evt.target.result;
        var split = dataStr.split(',');
        win(split[1], imageObj);
      }
    };
    // On error display an error
    reader.onerror = function(evt) {
      alert('There was an error reading the file: ' + imageObj.uri);
      fail(imageObj);
      return false;
    };

    // Read the supplied file URI
    reader.readAsDataURL(imageObj.uri);
  },

  //If we have images send them, else return
  sendImages: function() {
    var self = this;
    if(!self.images || self.images.length===0){
      return;
    }

    var success = function(data, imageObj) {
      $fh.act({
        act: 'postPicture',
        req: {
          ts: imageObj.ts,
          formUrl: imageObj.url,
          data: data
        }
      }, function(res){
        alert('Upload Success');
        // Remove image at index 1 and send next image in queue(array)
        apiController.images.splice(0, 1);
        sendImages();
      }, function(msg, err){
        alert('Upload Failed');
      });
    }
    var fail = function(){
      alert('Could not send image');
    }
    self.getImageData(self.images[0], success, fail);
  },

  addApiCalls: function() {
    var neededApis = document.body.getElementsByClassName('$fh');
    for (var i = 0; i < neededApis.length; i++) {
      var classes = neededApis[i].className;
      for (var j = 0; j < this.bindings.length; j++) {
        if (classes.indexOf(this.bindings[j]) !== -1) {
          var element = neededApis[i].getElementsByTagName('input')[0];
          jQuery('#' + element.id).unbind();
          this.bindFunction(this.bindings[j], neededApis[i]);
          j = this.bindings.length;
        }
      }
    }
  },

  bindFunction: function(className, element) {
    var fn = '';

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

    bindFn(element);
  },

  // Open camera and return URI
  fhCam: function(input) {
    var field = input.getElementsByTagName('input');
    $fh.cam({
      source: 'camera',
      uri: true
    }, function(res) {
      apiController.images.push({
        uri: res.uri,
        formUrl: jQuery('form').attr('action').toString(),
        ts: new Date().getTime()
      });
      alert(JSON.stringify({
        uri: res.uri,
        formUrl: jQuery('form').attr('action').toString(),
        ts: new Date().getTime()
      }));
    }, function(msg, err) {
      alert('Camera Error');
    });
  },

  //Returns Lat and Long as sting
  fhGeo: function(input) {
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