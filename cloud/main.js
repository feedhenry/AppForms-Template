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

    //Process signature field
    var sigFields = $('li.fhsig');
    if(sigFields.length > 0){
      $.each(sigFields, function(i, field){
        var originInput = $(field).find('div').find('input');
        var sigValue = $('<input>',{"class":'sigValue',type:'hidden', name: 'fh_file_' + originInput.attr('name'), id: 'fh_file_' + originInput.attr('id')});
        var sigField = $('<div>', {"class":'sigField'});
        var sigImg = $('<img>', {"class":'sigImage'});
        sigButton = $('<button>', {"class":'cap_sig_btn'});
        sigField.append(sigImg).append(sigButton);
        $(field).find('div').remove();
        $(field).append(sigValue).append(sigField);
      })
    }

    var processed_html = $('html').html();
    processed_html = processed_html.replace('/images/icons/', 'https://wufoo.com/images/icons/');
    processed_html = processed_html.replace('/stylesheets/public/forms/', 'https://wufoo.com/stylesheets/public/forms/');
    window.close();
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
      return callback(null, {
        "html": processed_html
      });
    });
  });
};