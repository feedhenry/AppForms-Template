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
    jQuery('#content').html(html);
    this.initWufoo();
    if (show_back_button) {
      // Inject a back button
      var back_button = $('<a>').text('Back to form list').click(function() {
        self.getFormList();
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

    var form_list = $('#form_list');
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
    jQuery('#form_list').hide();
  },

  hideContentArea: function() {
    jQuery('#content').hide();
  },

  showFormList: function() {
    jQuery('#form_list').show();
  },

  showContentArea: function() {
    jQuery('#content').show();
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
    alert('cam start');
    $fh.cam({
      act: 'picture',
      source: 'camera',
      uri: true
    }, function(res) {
      alert('Success ' + res.uri);
    }, function(msg, err) {
      alert(msg);
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