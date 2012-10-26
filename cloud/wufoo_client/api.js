var https = require('https');
var querystring = require('querystring');
var request = require('request');
var wufoo_config = require('../wufoo_config.js');

//http://www.wufoo.com/docs/api/v3/forms/
exports.getForms = function(callback) {
  var end_point = "forms";
  doGet(end_point, callback);
};

//http://www.wufoo.com/docs/api/v3/forms/
exports.getForm = function(form_hash, callback) {
  var end_point = "forms/" + form_hash;
  doGet(end_point, callback);
};

//http://www.wufoo.com/docs/api/v3/fields/
exports.getFormFields = function (form_hash, callback) {
  var end_point = "forms/" + form_hash + "/fields";
  doGet(end_point, callback);
};

//https://feedhenry.wufoo.eu/docs/api/v3/entries/post/
exports.postFormEntries = function(form_hash, data, callback) {
  //ToDo parse the data to remove any default fields i.e. EntryId, http://www.wufoo.com/docs/api/v3/entries/get/#default
  var end_point = "forms/" + form_hash + "/entries";
  doPost(end_point, data, callback);
};

function getConfig(callback) {
  if (typeof wufoo_config == 'undefined') {
    return callback({
      "error": "No config."
    });
  }
  return callback(null, wufoo_config);
}

function doGet(end_point, callback) {
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
        return callback(error, error);
      }

      return callback(null, body);
    });
  });
}

function doPost(end_point, data, callback) {
  //ToDO Refactor doGet and doPost later
  getConfig(function (err, wufoo_config) {
    if (err != null) {
      return callback(err, err);
    }
    var domain = wufoo_config.wufoo_config.api_domain;
    var api_key = wufoo_config.wufoo_config.api_key;

    var wufoo_url = "https://" + domain + "/api/v3/" + end_point + ".json";

    var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
    var auth_header = {
      'content-type' : 'application/x-www-form-urlencoded',
      'Authorization':auth
    };

    console.log("doPost : " + wufoo_url + " :: data : " + JSON.stringify(data));

    request.post({url:wufoo_url,
      headers:auth_header,
      body:querystring.stringify(data)
    }, function (err, res, body) {
      console.log("doPost : " + wufoo_url + " :: statusCode : " + res.statusCode);
      if (res.statusCode != 201) {
        console.log("doPost : " + wufoo_url + " :: error : " + body);
        var error = {error:body};
        return callback(error, error);
      }

      return callback(null, body);
    });

  });
}