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
        self.initSignatureFields();
        self.getLocation(function(location){
          self.initMapFields(location);
        });
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
      if (el.parents().hasClass('fhcam')) {
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
      //self.initWufoo();
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
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

  initSignatureFields: function() {
    var self = this;
    var sigButton = jQuery('.cap_sig_btn');
    if (sigButton.length == 0) {
      jQuery.each(jQuery('li.fhsig'), function(i, el) {
        var sigValue = jQuery('<input>', {
          "class": 'sigValue',
          type: 'hidden',
          name: 'sigValue' + i
        });
        var sigField = jQuery('<div>', {
          "class": 'sigField'
        });
        var sigImg = jQuery('<img>', {
          "class": 'sigImage',
          width: 150,
          height: 40
        });
        sigButton = jQuery('<button>', {
          "class": 'cap_sig_btn',
          text: 'Capture'
        });
        sigField.append(sigImg).append(sigButton);
        jQuery(el).find('div').remove();
        jQuery(el).append(sigValue).append(sigField);
      })
    } else {
      jQuery('.cap_sig_btn').text('Capture');
      jQuery('.sigImage').attr('width', 150).attr('height', 40);
    }
    jQuery.each(sigButton, function(i, button){
      jQuery(this).unbind().bind('click', function(e){
        self.captureSignature(e, jQuery(button).parents('li:first'));
      })
    })
  },

  captureSignature: function(e, ctx) {
    e.preventDefault();
    if (ctx.data('sigpadInited')) {
      jQuery('.sigPad', ctx).show();
    } else {
      var template = ['<form class="sigPad">'];
      template.push('<ul class="sigNav">');
      template.push('<li class="clearButton"><a href="#clear">Clear</a></li>');
      template.push('</ul>');
      template.push('<div class="sig sigWrapper">');
      template.push('<canvas class="pad" width="248" height="100"></canvas>');
      template.push('<input type="hidden" name="output" class="output">');
      template.push('</div>');
      template.push('<button class="cap_sig_done_btn" type="button">Done</button>');
      template.push('</form>');

      var sigField = jQuery(template.join(""));
      jQuery('.sigField', ctx).append(sigField);
      var sigPad = jQuery('.sigPad', ctx).signaturePad({
        drawOnly: true,
        lineTop: 80
      });
      ctx.data('sigpadInited', true);
      jQuery('.cap_sig_done_btn', ctx).bind('click', function(e) {
        var sigData = sigPad.getSignatureImage();
        if(sigData == "data:,"){ 
          sigData = toBitmapURL(jQuery('.sigPad', ctx).find('canvas')[0]);
        }
        var img = jQuery('.sigImage', ctx)[0];
        img.src = sigData;
        jQuery('.sigValue', ctx).val(sigData);
        jQuery('.sigPad', ctx).hide();
      })
    }
  },

  getLocation: function(callback){
    $fh.geo({act:'register', interval: 0}, function(location){
        callback(location);
      }, function(err){
        if(typeof navigator.geolocation != "undefined"){
            navigator.geolocation.getCurrentPosition(function(position){
              var location = {lon: position.coords.longitude, lat: position.coords.latitude};
              callback(location);
            })
          }
      });
  },

  initMapFields: function(location){
    var self = this;
    var mapCanvas = jQuery('.fh_map_canvas');
    if(mapCanvas.length == 0){
      jQuery.each(jQuery('li.fhmap'), function(i, field){
        var originInput = jQuery(field).find('div').find('input');
        var mapValue = jQuery('<input>',{"class":'mapValue',type:'hidden', name:'fh_map_' + originInput.attr('name')});
        var mapDiv = jQuery('<div>', {'class':'fh_map_canvas'});
        jQuery(field).find('div').remove();
        jQuery(field).append(mapValue).append(mapDiv);
      })
    }
    var firstMapField = jQuery('.fh_map_canvas:first').parents('li:first');
    self.showMap(location, firstMapField, function(){
      jQuery.each(jQuery('.fh_map_canvas:gt(0)'), function(i, canvas){
        self.showMap(location, jQuery(this).parents('li:first'));
      })
    });
  },

  showMap: function(location, ctx, callback){
    if(typeof ctx.data('fh_map') == "undefined"){
      var mapDiv = jQuery('.fh_map_canvas', ctx);
      $fh.map({target: mapDiv[0], lon: location.lon, lat: location.lat, zoom: 8}, function(res){
          var map = res.map;
          ctx.data('fh_map', map);
          var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: "Drag this to set position"
          });
          ctx.data('fh_map_marker', marker);
          google.maps.event.addListener(marker, "dragend", function(){
            var ps = marker.getPosition().toString();
            jQuery('.mapValue', ctx).val(ps);
          })
          if(callback){
            callback();
          }
      })
    } else {
      var map = ctx.data('fh_map');
      var marker = ctx.data('fh_map_marker');
      var center = new google.maps.LatLng(location.lat, location.lon);
      map.panTo(center);
      marker.setPosition(center);
      jQuery('.mapValue', ctx).val(center.toString());
      if(callback){
        callback();
      }
    }
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