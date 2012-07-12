var util = require('util');
var request = require('request');
var url = require("url");
var inline = require('./inline.js');

function cacheable() {
  // Should page fragments be cached?
  return false;
}

/*
 * Here we rewrite some Wufoo paths to JavaScript and CSS, since they're relative paths
 * rather than absolute ones. We also remove a Wufoo script tag (after form submission)
 * from the HTML, as this JavaScript will already be loaded client side as this point.
 */
updateWufooHTML = function(form_hash, updated, html, remove_script, cb) {
  var wufoo_config = require('wufoo_config.js');
  inline({
    "html": html,
    "baseUrl": "https://" + wufoo_config.wufoo_config.api_domain,
    "removeScripts": remove_script,
    "id": form_hash
  }, function(err, processed_html) {
    if (err != null) {
      console.error('error inlining html:' + err);
    }

    // save processed html to cache
    if (updated) {
      var form_data = JSON.stringify({
        "updated": updated,
        "html": processed_html
      });

      if (cacheable()) {
        $fh.cache({
          act: "save",
          key: form_hash,
          value: form_data
        }, function(err, res) {
          if (err) {
            console.error('Error saving form html to cache :' + err.toString());
          }

          return cb(processed_html);
        });
      } else {
        return cb(processed_html);
      }
    } else {
      return cb(processed_html);
    }
  });
};

formDataToMultipart = function(form_data, cb) {
  var data = form_data;
  var multipart_data = [];
  var wufoo_config = require('wufoo_config.js');

  if (typeof wufoo_config == 'undefined') {
    return callback(null, {
      "html": "",
      "error": "No config."
    });
  }

  // // Password unlock on submit
  // if (typeof wufoo_config.wufoo_config.form_password != 'undefined' && wufoo_config.wufoo_config.form_password) {
  //   var multipart_part = {
  //     'Content-Disposition': 'form-data; name=password"',
  //     body: wufoo_config.wufoo_config.form_password,
  //   }
  //   multipart_data.push(multipart_part);
  // }
  form_data.forEach(function(field) {
    //console.log(field)
    if (field.name != 'output' && typeof field.value != 'undefined') {
      if (field.name == 'clickOrEnter') {
        // clickOrEnter needs to be set to blank or 
        // multi-page forms won't work correctly
        field.value = '';
      }

      if (field.type == 'text' || field.type == 'map') {
        if (field.value != '') {
          var multipart_part = {
            'Content-Disposition': 'form-data; name="' + field.name + '"',
            body: field.value,
          }
          multipart_data.push(multipart_part);
        }
      } else if (field.type == 'file') {
        if (field.value != '') {
          var multipart_part = {
            'Content-Disposition': 'form-data; name="' + field.name + '"; filename="' + field.filename + '.' + field.extension + '"',
            'Content-Type': 'image/' + field.extension,
            body: new Buffer(field.value, 'base64'),
          }
          multipart_data.push(multipart_part);
        }
      } else {
        console.error('Error, unknown field type: ' + field.type);
      }
    }
  });

  return multipart_data;
};

getFormData = function(form_hash, callback) {
  getConfig(function(err, wufoo_config) {
    //console.log('after getConfig');
    if (err != null) {
      return callback(null, err);
    }
    var domain = wufoo_config.wufoo_config.api_domain;
    var api_key = wufoo_config.wufoo_config.api_key;
    var app_type = wufoo_config.wufoo_config.app_type;

    var forms_url = "https://" + domain + "/api/v3/forms/" + form_hash + ".json";

    var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
    var auth_header = {
      'Authorization': auth
    };

    request.get({
      url: forms_url,
      headers: auth_header
    }, callback);
  });
};

getConfig = function(callback) {
  var wufoo_config = require('wufoo_config.js');
  if (typeof wufoo_config == 'undefined') {
    return callback({
      "error": "No config."
    });
  }
  return callback(null, wufoo_config);
};

/* 
 * Here we get a Wufoo form's HTML, process it, and send it back to the client
 */
exports.getForm = function(params, callback) {
  //console.log('getConfig');
  getConfig(function(err, wufoo_config) {
    //console.log('after getConfig');
    if (err != null) {
      return callback(null, err);
    }

    var form_hash = params.form_hash;
    //console.log('getFormData');
    getFormData(form_hash, function(error, res, body) {
      //console.log('post getFormData:' + typeof body);
      var body_json = null;
      var updated = null;
      try {
        body_json = JSON.parse(body);
        var form = body_json.Forms[0];
        updated = form.DateUpdated;
      } catch (e) {
        console.error('Error parsing form api res body, process as normal:' + e);
        // ignore and process html as normal
      }

      if (cacheable()) {
        $fh.cache({
          act: "load",
          key: form_hash
        }, function(err, res) {
          var res_updated = null;
          var res_json = null;

          if (err) {
            console.error('cache val not found for key:' + form_hash + ' err=' + err);
            // treat error like key not found, and fall back to parsing html anyways as we
            // can't compare last updated date
          } else {
            try {
              res_json = JSON.parse(res);
              res_updated = res_json.updated;
            } catch (e) {
              console.error('Error parsing cache res, process as normal:' + e);
            }
          }

          if (res_updated === null || updated !== res_updated) {
            // need to get latest html as update date has changed, or can't get html from cache
            var domain = wufoo_config.wufoo_config.api_domain;
            var url = "https://" + domain + "/forms/" + form_hash + "/";

            // Unlock password
            if (typeof wufoo_config.wufoo_config.form_password != 'undefined' && wufoo_config.wufoo_config.form_password) {
              var req = request({
                method: 'POST',
                url: url,
                followAllRedirects: true,
                headers: {
                  'content-type': 'multipart/form-data;'
                },
                form: {
                  password: wufoo_config.wufoo_config.form_password
                }
              }, function(error, res, body) {
                updateWufooHTML(form_hash, updated, body, false, function(processed_html) {
                  return callback(null, {
                    "html": processed_html
                  });
                });
              });
            } else {
              request(url, function(error, res, body) {
                updateWufooHTML(form_hash, updated, body, false, function(processed_html) {
                  return callback(null, {
                    "html": processed_html
                  });
                });
              });
            }
          } else {
            return callback(null, {
              "cached": true,
              "html": res_json.html
            });
          }
        });
      } else {
        // need to get latest html as update date has changed, or can't get html from cache
        var domain = wufoo_config.wufoo_config.api_domain;
        var url = "https://" + domain + "/forms/" + form_hash + "/";

        // Unlock password
        if (typeof wufoo_config.wufoo_config.form_password != 'undefined' && wufoo_config.wufoo_config.form_password) {
          var req = request({
            method: 'POST',
            url: url,
            followAllRedirects: true,
            headers: {
              'content-type': 'multipart/form-data;'
            },
            form: {
              password: wufoo_config.wufoo_config.form_password
            }
          }, function(error, res, body) {
            updateWufooHTML(form_hash, updated, body, false, function(processed_html) {
              return callback(null, {
                "html": processed_html
              });
            });
          });
        } else {
          request(url, function(error, res, body) {
            updateWufooHTML(form_hash, updated, body, false, function(processed_html) {
              return callback(null, {
                "html": processed_html
              });
            });
          });
        }
      }


    });
  });
};

/* 
 * Here we get a list of available Wufoo forms
 */
exports.getForms = function(params, callback) {
  getConfig(function(err, wufoo_config) {
    if (err != null) {
      return callback(null, err);
    }

    var app_type = wufoo_config.wufoo_config.app_type;
    var domain = wufoo_config.wufoo_config.api_domain;
    var api_key = wufoo_config.wufoo_config.api_key;

    if (app_type == 'single_form') {
      var form_hash = wufoo_config.wufoo_config.form_hash;
      getFormData(form_hash, function(error, res, body) {
        return callback(null, {
          data: JSON.parse(body)
        });
      });
    } else {
      var forms_url = "https://" + domain + "/api/v3/forms.json";

      var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
      var auth_header = {
        'Authorization': auth
      };

      request.get({
        url: forms_url,
        headers: auth_header
      }, function(error, res, body) {
        return callback(null, {
          data: JSON.parse(body)
        });
      });
    }
  });
};

/* 
 * Here we get submit a form to Wufoo, and return its
 * proxied response back to the client
 */
exports.submitForm = function(params, callback) {
  var multipart_data = formDataToMultipart(params.form_data);
  var req = request({
    method: 'POST',
    uri: params.form_submission_url,
    followAllRedirects: true,
    headers: {
      'content-type': 'multipart/form-data;'
    },
    multipart: multipart_data
  }, function(e, r, b) {
    updateWufooHTML(params.form_hash, null, b, true, function(processed_html) {
      return callback(null, {
        "html": processed_html
      });
    });
  });
};