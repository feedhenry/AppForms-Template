var request = require('request');
var async = require('async');
var crypto = require('crypto');
var fs = require('fs');

var cheerio = require('cheerio');
exports = module.exports = function(opts, cb) {
  var html = opts.html;
  var id = opts.id || 'defaultId'; // used for hashing, should be unique for each unique html block passed in
  var removeScripts = opts.removeScripts || false;
  var baseUrl = opts.baseUrl || '';
  var start = Date.now();
  var $ = cheerio.load(html);
  // move all element in head down to body
  // and remove any unnecessary elements e.g. meta
  var firstBodyItem = $('<div>');
  $('meta').remove();
  $('title').remove();
  $('body').prepend(firstBodyItem);
  $('head').children().each(function() {
    firstBodyItem.before($(this));
  });
  firstBodyItem.remove();
  // use async here so that jquery stuff can be working away while remote resources are being loaded
  var scriptPlaceholders = {};
  async.parallel([function(oCallback) {
    // no non-blocking stuff in this fn so just work through it all and call oCallback at the end
    //Process signature field
    var sigFields = $('li.fhsig');
    if (sigFields.length > 0) {
      $.each(sigFields, function(i, field) {
        var originInput = $(field).find('div').find('input');
        var sigValue = $('<input>');
        sigValue.attr("class", 'sigValue').attr('type', 'hidden').attr('name', originInput.attr('name')).attr('id', originInput.attr('id'));
        var sigField = $('<div>');
        sigField.attr('class', 'sigField');
        var sigImg = $('<img>');
        sigImg.attr('class', 'sigImage');
        var sigButton = $('<button>');
        sigButton.attr('class', 'cap_sig_btn');
        sigField.append(sigImg).append(sigButton);
        $(field).find('div').remove();
        $(field).append(sigValue).append(sigField);
      });
    }
    // API binding names
    var bindings = ['fhgeo', 'fhcam', 'fhdate', 'fhtime', 'fhpics'];
    // Remove link to wufoo
    $('#logo a').attr('href', '#');
    // Do field logic function

    function fieldLogic(field, classes) {
      var type = $(field).find('input').first().attr('type');
      if (type === 'file' && classes.indexOf('fhcam') !== -1) {
        var originInput = $(field).find('div').find('input');
        var imgData = $('<input>');
        imgData.attr('type', 'hidden');
        imgData.attr('name', originInput.attr('name'));
        imgData.attr('id', originInput.attr('id'));
        var imgField = $('<div>');
        var imgFieldDesc = $('<p>').text('Click to upload a picture');
        imgField.append(imgFieldDesc);
        imgField.append(imgData);
        $(field).find('div').remove();
        $(field).append(imgField);
      }
    }
    // Modify the HTML inputs to have buttons etc
    var fields = $('.fh');
    $.each(fields, function(i, field) {
      var classes = $(field).attr('class');
      fieldLogic(field, classes);
      for (var i = 0; i < bindings.length; i++) {
        if (classes.indexOf(bindings[i]) != -1) {
          var button = $('<button>')
          button.attr('class', 'apibtn ' + bindings[i]);
          var img = $('<img>');
          img.attr('style', 'min-height:20px;');
          img.attr('src', './img/' + bindings[i] + '.png');
          button.append(img);
          $(field).find('div').first().append(button);

          if(bindings[i] == 'fhcam'){
            // add button to select pics from gallery
            var button = $('<button>')
            button.attr('class', 'apibtn ' + 'fhpics');
            var img = $('<img>');
            img.attr('style', 'min-height:20px;');
            img.attr('src', './img/fhcam_lib.png');
            button.append(img);
            $(field).find('div').first().append(button);
            $(field).find('div').first().attr('display', 'none');
          }
        }
      }
    });
    //Process map field
    var mapFields = $('li.fhmap');
    if (mapFields.length > 0) {
      $.each(mapFields, function(i, field) {
        var originInput = $(field).find('div').find('input');
        var mapValue = $('<input>');
        mapValue.attr('class', 'mapValue').attr('type', 'hidden').attr('name', originInput.attr('name')).attr('id', originInput.attr('id'));
        var mapDiv = $('<div>');
        mapDiv.attr('class', 'fh_map_canvas');
        $(field).find('div').remove();
        $(field).append(mapValue).append(mapDiv);
      });
    }
    // all jquery manipulation stuff done, async finished
    oCallback(null);
  }, function(oCallback) {
    var inlineCounter = 0;
    var scripts = $('script');
    //load scripts parallellellellellelly, temporarlily storing the content
    async.forEach(scripts, function(item, aCallback) {
      var script = $(item);
      var src = script.attr('src');
      if (!removeScripts) {
        // If script is not already inline, load content
        if (src != null && src !== '') {
          getRemoteResource(baseUrl + src, function(err, res, body) {
            if (!err && res.statusCode == 200) {
              // create hash of src url
              var shasum = crypto.createHash('sha1');
              // don't include id as this script will be the same for each form
              shasum.update(src);
              var hash = shasum.digest('hex');
              // do replacement of $$ with $$$ because of special meaning of $ in replace
              scriptPlaceholders[hash] = body.replace(/\$\$/g, '$$$$$$');
              script.after(hash).remove();
              aCallback(null);
            } else {
              aCallback(err);
            }
          });
        } else {
          // inline script, add to placeholders for processing later
          var shasum = crypto.createHash('sha1');
          shasum.update(id + (inlineCounter += 1));
          var hash = shasum.digest('hex');
          scriptPlaceholders[hash] = script.text().replace(/\$\$/g, '$$$$$$');
          script.after(hash).remove();
          aCallback(null);
        }
      } else {
        script.remove();
        aCallback(null);
      }
    }, function(err) {
      if (err != null) {
        console.error('error loading remote script:' + err.message);
      }
      oCallback(null);
    });
  }, function(oCallback) {
    //load links parallellellellellelly
    var links = $('link[rel!="canonical"]');
    async.forEach(links, function(item, aCallback) {
      var link = $(item);
      var href = link.attr('href');
      // If link has no href
      if (href != null && href !== '') {
        getRemoteResource(baseUrl + href, function(err, res, body) {
          if (!err && res.statusCode == 200) {
            var s = $('<style>');
            s.text(body);
            link.after(s);
            link.remove();
            aCallback(null);
          } else {
            aCallback(err);
          }
        });
      } else {
        aCallback(null);
      }
    }, function(err) {
      if (err != null) {
        console.error('error loading remote script:' + err.message);
      }
      oCallback(null);
    });
  }, function(oCallback) {
    // load images, base64 encode them, and embed them in html
    var imgs = $('img');
    async.forEach(imgs, function(item, aCallback) {
      var img = $(item);
      var src = img.attr('src');
      if (src != null && src !== '') {
        getRemoteResource({
          "uri": baseUrl + src,
          "encoding": null // return as buffer
        }, function(err, res, body) {
          if (!err && res.statusCode == 200) {
            var mimeType = src.match(/(.*)\.(.*?$)/);
            mimeType = mimeType[mimeType.length - 1];
            img.attr('src', 'data:image/' + mimeType + ';base64,' + body);
            aCallback(null);
          } else {
            aCallback(err);
          }
        }, true);
      } else {
        aCallback(null);
      }
    }, function(err) {
      if (err != null) {
        console.error('error loading remote img:' + err.message);
      }
      oCallback(null);
    });
  }], function(err, results) {
    if (err != null) {
      console.error('error loading remote resource/s:' + err.message);
    }
    // Everything inline now except for image references in css, and script contents
    // Let's inline css images references as base64
    var styles = $('style');
    async.forEach(styles, function(item, aCallback) {
      var style = $(item);
      var styleText = style.text();
      var r = new RegExp(/url\(\s*['"]?(.*?)['"]?\s*\)/g);
      var matches = [];
      while (match = r.exec(styleText)) { // apply regex and check if defined all in one go
        matches.push(match);
      }
      async.forEach(matches, function(match, mCallback) {
        var src = match[1];
        // Check for absolute vs relative path
        var full_src = src.indexOf('http') == 0 ? src : baseUrl + src;
        getRemoteResource({
          "uri": full_src,
          "encoding": null // return as buffer
        }, function(err, res, body) {
          if (!err && res.statusCode == 200) {
            var mimeType = src.match(/(.*)\.(.*?$)/); // get file extension from src
            mimeType = mimeType[mimeType.length - 1];
            styleText = styleText.replace(match[0], 'url("data:image/' + mimeType + ';base64,' + body + '")');
            mCallback(null);
          } else {
            mCallback(err);
          }
        }, true);
      }, function(err) {
        if (err != null) {
          console.error('error inlining image reference:' + err.message);
        }
        // all images inlined as base64, set the full style text
        style.html(styleText);
        aCallback(null);
      });
    }, function(err) {
      if (err != null) {
        console.error('error inlining css images references:' + err.message);
      }
      var subBtnType = $('.submit').attr('type');
      if (subBtnType == "" || subBtnType == undefined) {
        $('.submit').attr('type', 'submit');
      }
      // using placeholders for where script goes and replace it with script text now,
      // because if we do the script insertion with jsdom above, doesn't work.
      var processed_html = $.root().find('body').html();
      for (var hash in scriptPlaceholders) {
        // insert script content, and include initialisation check
        // so javascript is only executed once
        var content = scriptPlaceholders[hash];
        processed_html = processed_html.replace(hash, '<script>if(typeof window["' + hash + '"] === "undefined"){window["' + hash + '"] = true;' + content + '}</script>');
      }
      cb(null, processed_html);
    });
  });
};

function getRemoteResource(path, cb, isBinary) {
  var options = {};
  if ('object' === typeof path) {
    options = path;
  } else {
    options.uri = path;
  }
  $fh.cache({
    act: 'load',
    key: 'resource_' + options.uri
  }, function(err, res) {
    if (err || res == null || res == undefined || res == "undefined") {
      console.log("can not find cached data for resource: " + options.uri);
      request(options, function(err, res, body) {
        //console.log('got response for link:' + options.uri + ' res.statusCode:' + res.statusCode + ' body.length:' + body.length);
        if (res.statusCode == 200) {
          var val = body;
          if (isBinary) {
            val = body.toString('base64');
          }
          $fh.cache({
            act: 'save',
            key: 'resource_' + options.uri,
            value: val
          }, function() {
            console.log("Saved resource for uri: " + options.uri);
            cb(err, res, val);
          });
        } else {
          cb(err, res, body);
        }
      });
    } else {
      cb(null, {
        statusCode: 200
      }, res);
    }
  })
};