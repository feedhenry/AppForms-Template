var https = require('https');
var request = require('request');
var wufoo_config = require('../wufoo_config.js');

exports.getForms = function(callback) {
  var end_point = "forms";
  doGet(end_point, callback);
};

exports.getFormData = function(form_hash, callback) {
  var end_point = "forms/" + form_hash;
  doGet(end_point, callback);
};

exports.getFormFieldsData = function (form_hash, callback) {
  var end_point = "forms/" + form_hash + "/fields";
  doGet(end_point, callback);
};

getConfig = function(callback) {
  if (typeof wufoo_config == 'undefined') {
    return callback({
      "error": "No config."
    });
  }
  return callback(null, wufoo_config);
};

doGet = function (end_point, callback) {
  getConfig(function (err, wufoo_config) {
    if (err != null) {
      return callback(err, err);
    }
    var domain = wufoo_config.wufoo_config.api_domain;
    var api_key = wufoo_config.wufoo_config.api_key;

    var wufoo_url = "https://" + domain + "/api/v3/" + end_point + ".json";

    var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
    var auth_header = {
      'Authorization':auth
    };

    request.get({url:wufoo_url,
      headers:auth_header
    }, function (err, res, body) {
      console.log("doGet : " + wufoo_url + " :: statusCode : " + res.statusCode);
      if (res.statusCode != 200) {
        console.log("doGet : " + wufoo_url + " :: error : " + body);
        var error = {error:body};
        return callback(error, error)
      }

      return callback(null, body);
    });
  });
};