var request = require('request');
var jsdom = require("jsdom");
var async = require('async');
var crypto = require('crypto');

exports = module.exports = function (opts, cb) {
  var html = opts.html;
  var removeScripts = opts.removeScripts || false;
  var baseUrl = opts.baseUrl || '';


  var jsdom = require("jsdom"),
      window = jsdom.jsdom().createWindow();

  jsdom.jQueryify(window, './jquery.js', function() {
    var $ = window.$;

    $('html')[0].innerHTML = html;

    // move all element in head down to body
    // and remove any unnecessary elements e.g. meta
    var firstBodyItem = $('<div>');
    $('body').prepend(firstBodyItem);
    $('head').children(':not(meta):not(title)').each(function () {
      firstBodyItem.after($(this));
    });
    firstBodyItem.remove();

    // Process Scripts
    var scripts = $('script');
    var scriptPlaceholders = {};
    var links = $('link[rel!="canonical"]');

    async.parallel([function (oCallback) {
      var inlineCounter = 0;
      //load scripts parallellellellellelly, temporarlily storing the content
      async.forEach(scripts, function (item, aCallback) {
        var script = $(item);
        var src = script.attr('src');

        if (!removeScripts) {
          // If script is not already inline, load content
          if (src != null && src !== '') {
            getRemoteResource(baseUrl + src, function (err, res, body) {
              if (!err && res.statusCode == 200) {
                // create hash of src url
                var shasum = crypto.createHash('sha1');
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
            shasum.update('SCRIPTPLACEHOLDER-' + (inlineCounter += 1));
            var hash = shasum.digest('hex');
            scriptPlaceholders[hash] = script.text().replace(/\$\$/g, '$$$$$$');
            script.after(hash).remove();
            aCallback(null);
          }
        } else {
          script.remove();
          aCallback(null);
        }
      }, function (err) {
        if (err != null) {
          console.error('error loading remote script:' + err.message);
        }
        oCallback(null);
      });
    }, function (oCallback) {
      //load links parallellellellellelly
      async.forEach(links, function (item, aCallback) {
        var link = $(item);
        var href = link.attr('href');
        //console.log('doing link load for link:' + href);

        // If link has no href
        if (href != null && href !== '') {
          getRemoteResource(baseUrl + href, function (err, res, body) {
            if (!err && res.statusCode == 200) {
              link.after($('<style>', {
                "text": body
              })).remove();
              aCallback(null);
            } else {
              aCallback(err);
            }
          });
        } else {
          aCallback(null);
        }
      }, function (err) {
        if (err != null) {
          console.error('error loading remote script:' + err.message);
        }
        oCallback(null);
      });
    }, function (oCallback) {
      // load images, base64 encode them, and embed them in html
      var imgs = $('img');
      async.forEach(imgs, function (item, aCallback) {
        var img = $(item);
        var src = img.attr('src');
        if (src != null && src !== '') {
          getRemoteResource({
            "uri": baseUrl + src,
            "encoding": null // return as buffer
          }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
              var mimeType = src.match(/(.*)\.(.*?$)/);
              mimeType = mimeType[mimeType.length - 1];
              //console.log('image src=' + src + ' mimeType=' + mimeType + ' typeof body:' + typeof body);
              img.attr('src', 'data:image/' + mimeType + ';base64,' + body.toString('base64'));
              aCallback(null);
            } else {
              aCallback(err);
            }
          });
        } else {
          aCallback(null);
        }
      }, function (err) {
        if (err != null) {
          console.error('error loading remote img:' + err.message);
        }
        oCallback(null);
      });
    }], function (err, results) {
      if (err != null) {
        console.error('error loading remote resource/s:' + err.message);
      }


      // Everything inline now except for image references in css, and script contents
      // Let's inline css images references as base64
      var styles = $('style');
      async.forEach(styles, function (item, aCallback) {
        var style = $(item);
        var styleText = style.text();

        var r = new RegExp(/url\(\s*['"]?(.*?)['"]?\s*\)/g);
        var matches = [];
        while (match = r.exec(styleText)) { // apply regex and check if defined all in one go
          matches.push(match);
        }
        async.forEach(matches, function (match, mCallback) {
          var src = match[1];
          console.log('image src in style:' + src);
          getRemoteResource({
            "uri": baseUrl + src,
            "encoding": null // return as buffer
          }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
              var mimeType = src.match(/(.*)\.(.*?$)/); // get file extension from src
              mimeType = mimeType[mimeType.length - 1];
              console.log('image src=' + src + ' mimeType=' + mimeType + ' typeof body:' + typeof body);
              styleText = styleText.replace(match[0], 'url("data:image/' + mimeType + ';base64,' + body.toString('base64') + '")');
              mCallback(null);
            } else {
              mCallback(err);
            }
          });
        }, function (err) {
          if (err != null) {
            console.error('error inlining image reference:' + err.message);
          }
          // all images inlined as base64, set the full style text
          style.text(styleText);
          aCallback(null);
        });
      }, function (err) {
        if (err != null) {
          console.error('error inlining css images references:' + err.message);
        }

        // using placeholders for where script goes and replace it with script text now,
        // because if we do the script insertion with jsdom above, doesn't work.
        var processed_html = $('body').html();
        for (var hash in scriptPlaceholders) {
          // insert script content, and include initialisation check
          // so javascript is only executed once
          var content = scriptPlaceholders[hash];
          processed_html = processed_html.replace(hash, '<script>if(typeof window["' + hash + '"] === "undefined"){window["' + hash + '"] = true;' + content + '}</script>');
        }

        window.close();
        cb(null, processed_html);
      });
    });
  });
};


var getRemoteResource = function (path, cb) {
  var options = {};
  if ('object' === typeof path) {
    options = path;
  } else {
    options.uri = path;
  }

  request(options, function (err, res, body) {
    console.log('got response for link:' + options.uri + ' res.statusCode:' + res.statusCode + ' body.length:' + body.length);
    cb(err, res, body);
  });
};