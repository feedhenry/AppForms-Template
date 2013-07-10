var https = require('https');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('underscore');
var logger = require('logger').logger;

var wufoo_config_module;

try {
  wufoo_config_module = require('../wufoo_config.js');
}
catch (e) {
  console.log('Could not resolve wufoo_config.js module');
}

var wufoo_config = wufoo_config_module ? wufoo_config_module : {wufoo_config:{}};

//http://www.wufoo.com/docs/api/v3/forms/
exports.getForms = function (cb) {
  var memo = logger.onStart("api.getForms");
  var end_point = "forms";
  doApiGet(end_point, function (err, body) {
    if (err) {
      logger.onError(memo,err);
      return cb(err);
    }
    try {
      var j =JSON.parse(body);
      logger.onStop(memo);
      return cb(null,j);
    } catch(e){
      logger.onException(memo,e);
      return cb({"error":e, "msg":body});
    }
  });
};

//http://www.wufoo.com/docs/api/v3/forms/
exports.getForm = function(form_hash, cb) {
  var memo = logger.onStart("api.getForm",form_hash);
  var end_point = "forms/" + form_hash;
  doApiGet(end_point, function (err, body) {
    if (err) {
      logger.onError(memo,err);
      return cb(err);
    }
    try {
      var json = JSON.parse(body);
      var form = json.Forms[0];
      logger.onStop(memo);
      return cb(null, form);
    } catch (e) {
      logger.onException(memo,e);
      return cb({"error":e, "msg":body});
    }
  });
};

//http://www.wufoo.com/docs/api/v3/fields/
exports.getFormFields = function (form_hash, cb) {
  var memo = logger.onStart("api.getFormFields",form_hash);
  var end_point = "forms/" + form_hash + "/fields";
  doApiGet(end_point, function (err, body) {
    if (err) {
      logger.onError(memo,err);
      return cb(err);
    }
    try {
      var json = JSON.parse(body);
      logger.onStop(memo);
      return cb(null, json.Fields);
    } catch (e) {
      logger.onException(memo,e);
      return cb({"error":e, "msg":body});
    }
  });
};

//https://feedhenry.wufoo.eu/docs/api/v3/entries/post/
exports.postFormEntries = function(form_hash, data, cb) {
  //ToDo parse the data to remove any default fields i.e. EntryId, http://www.wufoo.com/docs/api/v3/entries/get/#default
  var memo = logger.onStart("api.postFormEntries",form_hash);
  var end_point = "forms/" + form_hash + "/entries";
  doPost(end_point, data, cb);
};

//Returns the page titles for the given form if any
exports.getFormPages = function (form_hash, cb) {
  var memo = logger.onStart("api.getFormPages",form_hash);
  var end_point = "/forms/" + form_hash;
  doGet(end_point, function (err, html) {
    if (err) {
      logger.onError(memo,err);
      return cb(err);
    }
    return getPages(html, function (err, res) {
      if (err) {
        logger.onError(memo,err);
        return cb(err);
      }
      logger.onStop(memo,form_hash);
      return cb(null, res);
    });
  });
};

//Returns any custom css for the given form if any
exports.getFormTheme = function (form_hash, cb) {
  var memo = logger.onStart("api.getFormTheme",form_hash);
  var end_point = "/forms/" + form_hash;
  doGet(end_point, function (err, html) {
    if (err) {
      logger.onError(memo,err);
      return cb(err);
    }
    return getTheme(html, function (err, res) {
      if (err) {
        logger.onError(memo,err);
        return cb(err);
      }
      logger.onStop(memo,form_hash);
      return cb(null, res);
    });
  });
};

function getPages(html, cb) {
  var memo = logger.onStart("api.getPages");
  try {
    var pages = {PaginationType:'tab', Pages:[]};
    var $ = cheerio.load(html);
    var pagination = $('.paging-context');
    pages.NoPageTitles = pagination.hasClass('nopagelabel');

    if (pagination.find('table').hasClass('pgStyle2')) {
      pages.PaginationType = "progress";
    }
    var tdFields = pagination.find('td[class=t]');
    var pageTitles = [];
    if (tdFields.length > 0) {
      $.each(tdFields, function (i, el) {
        pageTitles.push({Title:$(this).text().trim()});
      });
    }
    pages.Pages = pageTitles;
    logger.onStop(memo);
    return cb(null, pages);
  } catch(e) {
    logger.onException(memo,e);
    return cb({"error" : e, "msg" : html});

  }
}

function getTheme(html, cb) {
  var memo = logger.onStart("api.getTheme");
  try {
    var $ = cheerio.load(html);
    var links = $('link[rel=stylesheet]');
    var theme = "";
    async.forEach(links, function(item, aCallback) {
      var link = $(item);
      var href = link.attr('href');

      // If link has no href
      if (href != null && href !== '' && href.indexOf("theme.css") != -1) {
        doGet(href, function(err, body) {
          if (err) {return aCallback(err);}
          theme += body;
          aCallback(null);
        });
      } else {
        aCallback(null);
      }
    }, function(err) {
      if (err != null) {
        logger.warn('error loading remote script:' + err.message);
      }
      inlineImages(theme, function(err, css) {
        if (err) {
          logger.onError(memo,err);
          return cb(err);
        }
        logger.onStop(memo);
        return cb(null, css);
      });
    });
  } catch(e) {
    logger.onException(memo,e);
    return cb({"error" : e, "msg" : html});
  }
}

function inlineImages(css, cb) {
  var memo = logger.onStart("api.inlineImages");
  var r = new RegExp(/url\(\s*['"]?(.*?)['"]?\s*\)/g);
  var matches = [];
  while (match = r.exec(css)) { // apply regex and check if defined all in one go
    matches.push(match);
  }
  async.forEach(matches, function (match, aCallback) {
    var src = match[1];
    // Check for absolute vs relative path
    doGet(src, function (err, body) {
      if (err) {return aCallback(err);}
      var mimeType = src.match(/(.*)\.(.*?$)/); // get file extension from src
      mimeType = mimeType[mimeType.length - 1];
      //console.log('mimeType:', mimeType);
      css = css.replace(match[0], 'url("data:image/' + mimeType + ';base64,' + body + '")');
      return aCallback(null);
    }, true);
  }, function (err) {
    if (err != null) {
      logger.onError(memo,err);
      console.error('error inlining image reference:' + err.message);
    }
    // all images inlined as base64, set the full style text
    logger.onStop(memo);
    cb(null, css);
  });
}

function getConfig(callback) {
  if (typeof wufoo_config == 'undefined') {
    return callback({
      "error": "No config."
    });
  }
  return callback(null, wufoo_config);
}

function doApiGet(end_point, callback) {
  doGet("/api/v3/" + end_point + ".json", callback);
}

function doGet(end_point, callback, isBinary) {
  var memo = logger.onStart("api.doGet",end_point);
  getConfig(function (err, wufoo_config) {
    if (err != null) {
      logger.onError(memo,err);
      return callback(err, err);
    }
    var domain = wufoo_config.wufoo_config.api_domain;
    var api_key = wufoo_config.wufoo_config.api_key;

    var reg = new RegExp("^https?://.*$");

    var url = "https://" + domain + end_point;
    if (reg.test(end_point)) {
      url = end_point;
    }

    var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
    var auth_header = {
      'Authorization':auth
    };

    var options = {
      url:url,
      headers:auth_header
    };

    if (isBinary) {
      options.encoding = null; // return as buffer
    }
    return request.get(options, function (err, res, body) {
      if (err != null) {
        logger.onError(memo,err);
        return callback(err, err);
      }

      //console.log('got response for link:' + url + ' res.statusCode:' + res.statusCode + ' body.length:' + body.length);
      if (res.statusCode != 200) {
        var error = {error:body};
        logger.onError(memo,error);
        return callback(error, error);
      }

      if (isBinary) {
        body = body.toString('base64');
      }

      logger.onStop(memo,end_point);
      return callback(null, body);
    });
  });
}

function doPost(end_point, data, callback) {
  var memo = logger.onStart("api.doPost",end_point);
  getConfig(function (err, wufoo_config) {
    if (err != null) {
      logger.onError(memo,err);
      return callback(err, err);
    }
    var domain = wufoo_config.wufoo_config.api_domain;
    var api_key = wufoo_config.wufoo_config.api_key;
    var url = wufoo_config.wufoo_config.post_url;
    var url;
    if(!url){
      url = "https://" + domain + "/api/v3/";
    }
    url = url + end_point + ".json";

    var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
    var headers = {
      'content-type' : 'multipart/form-data',
      'Authorization':auth
    };
    var multipart_data = dataToMultipart(data);

//    console.log("doPost : " + url + " :: data : " + JSON.stringify(data));

    request.post({url:url,
      headers:headers,
      multipart:multipart_data,
      preambleCRLF: true
    }, function (err, res, body) {
      if (err != null) {
        logger.onError(memo,err);
        return callback(err, err);
      }
      logger.onStop(memo,url + " :: statusCode : " + res.statusCode);
      return callback(null, body);
    });

  });
}

function dataToMultipart(data) {
  var multipart_data = [];
  if (data) {
    _.each(data, function (value, key) {
      var part = {};
      if (_.isString(value)) {
        part = {
          'Content-Disposition':'form-data; name="' + key + '";',
          'body':value
        };
      } else {
        if(value.fileBase64 && value.filename && value.content_type) {
          //Strip the data url stuff from the start, could get content type from this!
//          var dataParts = sigData.match(/data:(.*\/(.*));base64,(.*)/);
//          console.log("\n\nfile : " + JSON.stringify(value));
          value.fileBase64 = value.fileBase64.replace(/^data:([^,]*,|)/, "");
          part = {
            'Content-Disposition':'form-data; name="' + key + '"; filename="' + value.filename + '"',
            'Content-Type':value.content_type,
            'body':new Buffer(value.fileBase64, 'base64')
          }
        }
      }
      if(!_.isEmpty(part)) {
        multipart_data.push(part);
      }
    });
  }
  return multipart_data;
}
