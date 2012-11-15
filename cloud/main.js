var util = require('util');
var request = require('request');
var url = require("url");
var wufoo_api = require('./wufoo_client/api.js');
var wufoo_admin = require('./wufoo_client/admin.js');
var wufoo_config = require('./wufoo_config.js');
var async = require('async');
var _ = require('underscore');

function getMinFormData(form) {
  return {
    "Name": form.Name,
    "Hash": form.Hash,
    "DateUpdated": form.DateUpdated
  };
}

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
  var form_hash = params.id;
  var updateDate = params.version || null;

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

  // get form info first to check last updated date
  wufoo_api.getForm(form_hash, function (err, res) {
    if (err) return callback(null, err);

    // check update date
    console.log('updateDate:', updateDate);
    console.log('res.DateUpdated:', res.DateUpdated);
    if (updateDate != null && updateDate === res.DateUpdated) {
      // update dates are the same, send minimum data rather than waste bandwidth
      return callback(null, getMinFormData(res));
    }

    // update dates are different, get full form data
    var form = res || {};
    async.parallel([function (cb) {
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
        return callback(null, err);
      }
      
      var pages = results[2] || {};
      form.PaginationType = pages.PaginationType || 'tab';
      form.NoPageTitles = pages.NoPageTitles || false;
      form.Pages = pages.Pages || [];
      form.Theme = results[3] || "";

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
      var rules = results[1] || {};
      form.Rules = rules.FormRules || [];

      // parse page & field rules
      var tempPageRules = parseRules(rules.PageRules || []);
      //console.log('tempPageRules:', tempPageRules);
      var tempFieldRules = parseRules(rules.FieldRules || []);
      //console.log('tempFieldRules:', tempFieldRules);

      // iterate over fields, moving each into relevant page, or dropping if wufoo default fields
      var fields = results[0] || [];
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

          // allow for grouping of fhcam fields
          var addField = true;
          if (field.Type === 'file' && field.ClassNames.indexOf('fhcam') > -1) { // field is fhcam
            var fieldBefore = page.Fields[page.Fields.length - 1];
            if (fieldBefore && fieldBefore.ClassNames.indexOf('fhcam') > -1) { // field before is also fhcam, group it
              addField = false;
              fieldBefore.SubFields = fieldBefore.SubFields || [];
              fieldBefore.SubFields.push(field);
            }
          }
          if (addField) {
            page.Fields.push(field);
          }

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
  });
};

//res :: {"Success":1,"EntryId":10,"EntryLink":"https://mnairn.wufoo.com/api/v3/forms/m7x3q1/entries.json?Filter1=EntryId+Is_equal_to+10"}

//{"error":"{"Success":0,"ErrorText":"Errors have been highlighted below.","FieldErrors":[{\"ID\":\"Field116\",\"ErrorText\":\"This field is required. Please enter a value.\"}]}"}

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
 * Here we get a list of available Wufoo forms
 */
exports.getForms = function (params, callback) {
  // can't filter forms list endpoint by hash, so get all and filter them by hash here
  var hashes = wufoo_config.wufoo_config.form_hashes || [wufoo_config.wufoo_config.form_hash];
  wufoo_api.getForms(function (err, results) {
    if (err) return callback(null, err);
    var forms = _(results.Forms).filter(function (form) {
      return hashes.indexOf(form.Hash) > -1;
    }).map(function (form) {
      // minimum amount required
      return getMinFormData(form);
    });

    return callback(null, {
      data: forms,
      config: require('./client_config.js').config
    });
  });
};
