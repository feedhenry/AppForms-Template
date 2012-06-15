var util = require('util');
var request = require('request');
var jsdom = require("jsdom");

/* 
 * Here we rewrite some Wufoo paths to JavaScript and CSS, since they're relative paths
 * rather than absolute ones. We also remove a Wufoo script tag (after form submission)
 * from the HTML, as this JavaScript will already be loaded client side as this point.
 */
updateWufooHTML = function(html, remove_script, cb) {
  var jsdom = require("jsdom"),
      window = jsdom.jsdom().createWindow();

  jsdom.jQueryify(window, './jquery.js', function() {
    var $ = window.$;

    $('html')[0].innerHTML = html;

    // Process Wufoo Scripts
    var scripts = $('script');
    $.each(scripts, function(i, script) {
      var script = $(script);
      var script_source = script.attr('src');

      if (script_source) {
        script.attr('src', "https://wufoo.com" + script_source);
      }

      if (remove_script) {
        script.remove();
      }
    });

    // API binding names
    var bindings = ['fhgeo', 'fhcam'];
    // Remove link to wufoo
    console.log('Remove link href');
    $('#logo').find('a')[0].href = '#';
    // Modify the HTML inputs to have buttons etc
    console.log('Begin create button');
    var button = window.document.createElement('button');
    button.style.top = '4px';
    button.style.left = '10px';
    button.style.position = 'relative';
    console.log('End create button');
    
    var fields = $('.fh');
    console.log('Begin for each field');
    $.each(fields, function(i, field){
      var classes = ($(field).attr('class'));
      for(var i=0; i<bindings.length; i++){
        if(classes.indexOf(bindings[i])){
          button.inputField = field;
          button.innerHTML = '<img style="min-height:20px;" src="./img/' + bindings[i] + '.png" />';
          $(field.getElementsByTagName('div')[0]).append(button);
        }
      }
    });
    console.log('End for each field');

    var processed_html = $('html').html();
    processed_html = processed_html.replace('/images/icons/', 'https://wufoo.com/images/icons/');
    processed_html = processed_html.replace('/stylesheets/public/forms/', 'https://wufoo.com/stylesheets/public/forms/');
    window.close();
    console.log(processed_html);
    return cb(processed_html);
  });
};

processFormData = function(form_data, cb) {
  var data = form_data;

  // clickOrEnter needs to be set to blank or 
  // multi-page forms won't work correctly
  data = data.replace('clickOrEnter=click', 'clickOrEnter=');
  return data;
};

/* 
 * Here we get a Wufoo form's HTML, process it, and send it back to the client
 */
exports.getForm = function(params, callback) {
  var wufoo_config = require('wufoo_config.js');
  if (typeof wufoo_config == 'undefined') {
    return callback(null, {
      "html": "",
      "error": "No config."
    });
  }

  var domain = wufoo_config.wufoo_config.api_domain;
  var form_hash = params.form_hash;
  var url = "https://" + domain + "/forms/" + form_hash + "/";

  request(url, function(error, res, body) {
    updateWufooHTML(body, false, function(processed_html) {
      console.log('html processing done, sending response.');
      console.log(processed_html);
      return callback(null, {
        "html": processed_html
      });
    });
  });
};

/* 
 * Here we get a list of available Wufoo forms
 */
exports.getForms = function(params, callback) {
  var wufoo_config = require('wufoo_config.js');
  if (typeof wufoo_config == 'undefined') {
    return callback(null, {
      "error": "No config."
    });
  }

  var domain = wufoo_config.wufoo_config.api_domain;
  var api_key = wufoo_config.wufoo_config.api_key;
  var forms_url = "https://" + domain + "/api/v3/forms.json";

  var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
  var auth_header = {'Authorization': auth};

  request.get({url: forms_url, headers: auth_header}, function(error, res, body) {
    console.log('got all forms');
    return callback(null, {
      data: JSON.parse(body)
    });
  });
};

/* 
 * Here we get submit a form to Wufoo, and return its
 * proxied response back to the client
 */
exports.submitForm = function(params, callback) {
  console.log('in submitForm with ts:' + Date.now());
  console.log('post_data: ' + params.form_data);

  var post_data = processFormData(params.form_data);

  var req = request.post({
    url: params.form_submission_url,
    body: post_data,
    followAllRedirects: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  }, function(error, res, body) {
    updateWufooHTML(body, true, function(processed_html) {
      console.log('html processing done, sending response.')
      return callback(null, {
        "html": processed_html
      });
    });
  });
};



exports.postPicture = function(params, callback) {
  console.log('in postPicture with ts:' + Date.now());

  $fh.db({
    "act": "create",
    "type": "pictures",
    "fields": {
      "data": params.data,
      "ts": params.ts,
      "formUrl": params.formUrl,
      "transferred": false
    }
  }, function(err, data) {
    if (err) {
      console.log('Picture write failed');
      console.log("Error " + err);
      return callback(null, {
        status: "Fail"
      });
    } else {
      console.log('Picture wrote okay!');
      /*setTimeout(function() {
        exports.transfer(function(err, ret) {
          console.log('transfer finished with status: ', ret);
        });
      }, 1); */
      return callback(null, {
        status: "Success"
      });
    }
  });
};

exports.getList = function(params, callback) {
  console.log('in getList with ts:' + Date.now());

  $fh.db({
    "act": "list",
    "type": "pictures"
  }, function(err, data) {
    return callback(null, {
      status: "ok",
      pictures: data
    });
  });
};

exports.deletePictures = function(params, callback) {
  console.log('in deletePictures with ts:' + Date.now());

  $fh.db({
    "act": "list",
    "type": "pictures",
    "fields": ["ts", "transferred"]
  }, function(err, data) {
    var pictures = data.list;
    var picture_count = pictures.length;

    for (var i = 0; i < picture_count; i++) {
      var picture = pictures[i];
      var guid = picture.guid;

      $fh.db({
        "act": "delete",
        "type": "pictures",
        "guid": guid
      }, function(err, data) {});
    };

    return callback(null, {
      status: "ok"
    });
  });
};
