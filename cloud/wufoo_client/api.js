var https = require('https');
var querystring = require('querystring');
var request = require('request');
var wufoo_config = require('../wufoo_config.js');
var cheerio = require('cheerio');
var async = require('async');

// DEPRECATED
//http://www.wufoo.com/docs/api/v3/forms/
exports.getForms = function (cb) {
  var end_point = "forms";
  doApiGet(end_point, function (err, body) {
    if (err) {return cb(err);}
    return cb(null,
      JSON.parse(body)
    );
  });
};

//http://www.wufoo.com/docs/api/v3/forms/
exports.getForm = function(form_hash, cb) {
  var end_point = "forms/" + form_hash;
  doApiGet(end_point, function (err, body) {
    if (err) {return cb(err);}
    try {
      var json = JSON.parse(body);
      var form = json.Forms[0];
      return cb(null, form);
    } catch (e) {
      return cb({
        "error":e
      });
    }
  });
};

//http://www.wufoo.com/docs/api/v3/fields/
exports.getFormFields = function (form_hash, cb) {
  var end_point = "forms/" + form_hash + "/fields";
  doApiGet(end_point, function (err, body) {
    if (err) {return cb(err);}
    try {
      var json = JSON.parse(body);
      return cb(null, json.Fields);
    } catch (e) {
      return cb({
        "error":e
      });
    }
  });
};

//https://feedhenry.wufoo.eu/docs/api/v3/entries/post/
exports.postFormEntries = function(form_hash, data, cb) {
  //ToDo parse the data to remove any default fields i.e. EntryId, http://www.wufoo.com/docs/api/v3/entries/get/#default
  var end_point = "forms/" + form_hash + "/entries";
  doPost(end_point, data, cb);
};

//Returns the page titles for the given form if any
exports.getFormPages = function (form_hash, cb) {
  var end_point = "/forms/" + form_hash;
  doGet(end_point, function (err, html) {
    if (err) {return cb(err);}
    return getPages(html, function (err, res) {
      if (err) {return cb(err);}
      return cb(null, res);
    });
  });
};

//Returns any custom css for the given form if any
exports.getFormTheme = function (form_hash, cb) {
  var end_point = "/forms/" + form_hash;
  doGet(end_point, function (err, html) {
    if (err) {return cb(err);}
    return getTheme(html, function (err, res) {
      if (err) {return cb(err);}
      return cb(null, res);
    });
  });
};

function getPages(html, cb) {
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
  return cb(null, pages);
}

function getTheme(html, cb) {
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
      console.error('error loading remote script:' + err.message);
    }
    inlineImages(theme, function(err, css) {
      if (err) {return cb(err);}
      return cb(null, css);
    });
  });
}

function inlineImages(css, cb) {
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
      console.error('error inlining image reference:' + err.message);
    }
    // all images inlined as base64, set the full style text
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
  getConfig(function (err, wufoo_config) {
    if (err != null) {
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
        console.log("doGet: " + url + " :: error : " + err);
        return callback(err, err);
      }

      console.log('got response for link:' + url + ' res.statusCode:' + res.statusCode + ' body.length:' + body.length);
      if (res.statusCode != 200) {
        console.log("doGet : " + url + " :: error : " + body);
        var error = {error:body};
        return callback(error, error);
      }

      if (isBinary) {
        body = body.toString('base64');
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

    var url = "https://" + domain + "/api/v3/" + end_point + ".json";

    var auth = 'Basic ' + new Buffer(api_key + ':' + 'foostatic').toString('base64');
    var auth_header = {
      'content-type' : 'application/x-www-form-urlencoded',
      'Authorization':auth
    };

    //console.log("doPost : " + url + " :: data : " + JSON.stringify(data));

    request.post({url:url,
      headers:auth_header,
      body:querystring.stringify(data)
    }, function (err, res, body) {
      if (err != null) {
        console.log("doPost: " + url + " :: error : " + err);
        return callback(err, err);
      }
      console.log("doPost : " + url + " :: statusCode : " + res.statusCode);
      if (res.statusCode != 201) {
        console.log("doPost : " + url + " :: error : " + body);
        var error = {error:body};
        return callback(error, error);
      }

      return callback(null, body);
    });

  });
}
