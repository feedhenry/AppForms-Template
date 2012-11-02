var util = require('util');
var request = require('request');
var url = require("url");
var inline = require('./inline.js');
var wufoo_api = require('./wufoo_client/api.js');
var wufoo_admin = require('./wufoo_client/admin.js');
var wufoo_config = require('./wufoo_config.js');
var async = require('async');
var _ = require('underscore');

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

  if (typeof wufoo_config == 'undefined') {
    return cb(null, {
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
    if (field.name != 'output' && typeof field.value != 'undefined') {
      if (field.name == 'clickOrEnter') {
        // clickOrEnter needs to be set to blank or 
        // multi-page forms won't work correctly
        field.value = '';
      }

      if (field.type == 'text' || field.type == 'map' || field.type == 'radio' || field.type == 'checkbox') {
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

exports.getFormTheme = function (params, callback) {
  var form_hash = params.form_hash;

  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  wufoo_api.getFormTheme(form_hash, function (err, body) {
    if (err) return callback(err);
    return callback(null, {data: body});
  });
};

exports.getFormPages = function (params, callback) {
  var form_hash = params.form_hash;

  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  wufoo_api.getFormPages(form_hash, function (err, body) {
    if (err) return callback(err);
    return callback(null, {data: body});
  });
};

exports.getFormFields = function (params, callback) {
  var form_hash = params.form_hash;

  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  wufoo_api.getFormFields(form_hash, function (err, body) {
    if (err) return callback(err);
    return callback(null, {data: body});
  });
};

exports.getForm = function (params, callback) {
  console.log('getForm()');
  var form_hash = params.form_hash;

  // TODO: should client handle error as first params? currently sends 500 if error is first param, 200 if second param
  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  // asynchronously get:
  // - form data
  // - fields data
  // - rules data
  // - pagination data
  // - theme data
  // and merge together into single json object
  function cbHandler(err, res, cb) {
    // log errors but dont pass back to cb. we can still construct form json
    if (err) {
      console.error('ERROR:', err);
    }
    cb(null, res);
  }

  async.parallel([function (cb) {
    wufoo_api.getForm(form_hash, cb); // essential data, let async pass error to main callback
  },function (cb) {
    wufoo_api.getFormFields(form_hash, cb); // essential data, let async pass error to main callback
  }, function (cb) {
    wufoo_admin.getRules(form_hash, function (err, res) {
      // rules aren't essential, so delegate to cbHandler and log errors, if any
      cbHandler(err, res, cb);
    });
  }, function (cb) {
    wufoo_api.getFormPages(form_hash, function (err, res) {
      // pages aren't essential, so delegate to cbHandler and log errors, if any
      cbHandler(err, res, cb);
    });
  }, function (cb) {
    wufoo_api.getFormTheme(form_hash, function (err, res) {
      // theme isn't essential, so delegate to cbHandler and log errors, if any
      cbHandler(err, res, cb);
    });
  }], function (err, results) {
    if (err) {
      return cb(null, err);
    }
    
    var form = results[0] || {};
    var pages = results[3] || {};
    form.PaginationType = pages.PaginationType || 'tab';
    form.NoPageTitles = pages.NoPageTitles || false;
    form.Pages = pages.Pages || [];
    form.Theme = results[4] || "";

    function parseRules(rules) {
      var parsedRules = {};
      // iterate over rules
      rules.forEach(function (rule, rIndex) {
        // iterate over conditions, adding a temp entry for each
        rule.Conditions.forEach(function (condition, cIndex) {
          var tempRule = _.clone(rule); // clone rule as we're manipulating it multiple times potentially depending on # conditions
          tempRule.condition = condition;
          var fieldId = 'Field' + condition.FieldName;
          parsedRules[fieldId] = parsedRules[fieldId] || [];
          parsedRules[fieldId].push(tempRule);
        });
      });

      return parsedRules;
    }

    // add form rules at top level
    var rules = results[2] || {};
    form.Rules = rules.FormRules || [];

    // parse page & field rules
    var tempPageRules = parseRules(rules.PageRules || []);
    //console.log('tempPageRules:', tempPageRules);
    var tempFieldRules = parseRules(rules.FieldRules || []);
    //console.log('tempFieldRules:', tempFieldRules);

    // iterate over fields, moving each into relevant page, or dropping if wufoo default fields
    var fields = results[1] || [];
    var wufoo_default_fields = ['EntryId', 'DateCreated', 'CreatedBy', 'LastUpdated', 'UpdatedBy'];
    fields.forEach(function (field, index) {
      var pageNum = parseInt(field.Page || "1", 10) -1;
      if (wufoo_default_fields.indexOf(field.ID) === -1) {
        // if any field rules mathc this field id, add it to field Rules object
        if (tempFieldRules[field.ID] != null) {
          field.Rules = tempFieldRules[field.ID];
        }

        // add fields to matching page, ensuring page exists on form object
        var page = form.Pages[pageNum] = form.Pages[pageNum] || {};
        page.Fields = page.Fields || [];
        page.Fields.push(field);

        // also, if any page rules matches this field id, add it to the page to (page rules don't have a page id associated with them (why not?), instead have field id of affecting field)
        if (tempPageRules[field.ID] != null) {
          page.Rules = page.Rules || [];
          page.Rules.push.apply(page.Rules, tempPageRules[field.ID]); // push array of rules onto end
        }
      }
    });
    //console.log('form:', form);
    return callback(null, {data:form});
  });
};

exports.postEntry = function (params, callback) {
  var form_hash = params.form_hash;
  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });
  var data = params.data;
  return wufoo_api.postFormEntries(form_hash, data, function (err, resp) {
    if (err != null) {
      console.error('error posting form entry: ' + err.error);
      return callback(null, err);
    }
    return callback(null, resp);
  });
};

/* 
 * Here we get a Wufoo form's HTML, process it, and send it back to the client
 */

/* 
 * Here we get a list of available Wufoo forms
 */
exports.getForms = function (params, callback) {
  var hashes = wufoo_config.wufoo_config.form_hashes || [wufoo_config.wufoo_config.form_hash];
  async.map(hashes, function (hash, aCallback) {
    exports.getForm({
      form_hash: hash
    }, function (err, res) {
      if (err) return aCallback(err);

      return aCallback(null, res.data);
    });
  }, function (err, results) {
    if (err) return callback(null, err);

    return callback(null, {
      data: results
    });
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
        "html": processed_html + '<button onclick="WufooController.showHome()">Back to Forms</button>'
      });
    });
  });
};