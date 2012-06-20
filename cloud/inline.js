var request = require('request');
var jsdom = require("jsdom");
var async = require('async');
var crypto = require('crypto');

exports = module.exports = function(opts, cb) {
  var html = opts.html;
  var id = opts.id || 'defaultId'; // used for hashing, should be unique for each unique html block passed in  
  var removeScripts = opts.removeScripts || false;
  var baseUrl = opts.baseUrl || '';


  var jsdom = require("jsdom"),
      window = jsdom.jsdom().createWindow();

  jsdom.jQueryify(window, './jquery.js', function() {
    var $ = window.$;

    $('html')[0].innerHTML = html;

    //Process signature field
    var sigFields = $('li.fhsig');
    if (sigFields.length > 0) {
      $.each(sigFields, function(i, field) {
        var originInput = $(field).find('div').find('input');
        var sigValue = $('<input>', {
          "class": 'sigValue',
          type: 'hidden',
          name: originInput.attr('name'),
          id: originInput.attr('id')
        });
        var sigField = $('<div>', {
          "class": 'sigField'
        });
        var sigImg = $('<img>', {
          "class": 'sigImage'
        });
        sigButton = $('<button>', {
          "class": 'cap_sig_btn'
        });
        sigField.append(sigImg).append(sigButton);
        $(field).find('div').remove();
        $(field).append(sigValue).append(sigField);
      });
    }

    // API binding names
    var bindings = ['fhgeo', 'fhcam'];
    // Remove link to wufoo
    $('#logo a')[0].href = '#';
    // Do field logic function
    function fieldLogic(field, classes) {
      var type = ($(field.getElementsByTagName('input')[0]).attr('type'))
      if (type === 'file' && classes.indexOf('fhcam') !== -1) {
        var originInput = $(field).find('div').find('input');
        var imgData = $('<input>', {
          type: 'hidden',
          name: originInput.attr('name'),
          id: originInput.attr('id')
        });
        var imgField = $('<div>', {});
        var imgFieldDesc = $('<p>').text('Click to upload a picture')[0];
        imgField.append(imgFieldDesc);
        imgField.append(imgData);
        $(field).find('div').remove();
        $(field).append(imgField);
      }
    }
    // Modify the HTML inputs to have buttons etc
    var fields = $('.fh');
    $.each(fields, function(i, field) {
      var classes = ($(field).attr('class'));
      fieldLogic(field, classes);
      for (var i = 0; i < bindings.length; i++) {
        if (classes.indexOf(bindings[i]) != -1) {
          var button = window.document.createElement('button');
          button.className = 'apibtn ' + bindings[i];
          button.innerHTML = '<img style="min-height:20px;" src="./img/' + bindings[i] + '.png" />';
          $(field.getElementsByTagName('div')[0]).append(button);
        }
      }
    });

    //Process map field
    var mapFields = $('li.fhmap');
    if (mapFields.length > 0) {
      $.each(mapFields, function(i, field) {
        var originInput = $(field).find('div').find('input');
        var mapValue = $('<input>', {
          "class": 'mapValue',
          type: 'hidden',
          name: originInput.attr('name'),
          id: originInput.attr('id')
        });
        var mapDiv = $('<div>', {
          'class': 'fh_map_canvas'
        });
        $(field).find('div').remove();
        $(field).append(mapValue).append(mapDiv);
      })
    }

    // move all element in head down to body
    // and remove any unnecessary elements e.g. meta
    var firstBodyItem = $('<div>');
    $('body').prepend(firstBodyItem);
    $('head').children(':not(meta):not(title)').each(function() {
      firstBodyItem.after($(this));
    });
    firstBodyItem.remove();

    // Process Scripts
    var scripts = $('script');
    var scriptPlaceholders = {};
    var links = $('link[rel!="canonical"]');

    async.parallel([function(oCallback) {
      var inlineCounter = 0;
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
      async.forEach(links, function(item, aCallback) {
        var link = $(item);
        var href = link.attr('href');
        //console.log('doing link load for link:' + href);
        // If link has no href
        if (href != null && href !== '') {
          getRemoteResource(baseUrl + href, function(err, res, body) {
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
          //console.log('image src in style:' + src);
          getRemoteResource({
            "uri": baseUrl + src,
            "encoding": null // return as buffer
          }, function(err, res, body) {
            if (!err && res.statusCode == 200) {
              var mimeType = src.match(/(.*)\.(.*?$)/); // get file extension from src
              mimeType = mimeType[mimeType.length - 1];
              //console.log('image src=' + src + ' mimeType=' + mimeType + ' typeof body:' + typeof body);
              styleText = styleText.replace(match[0], 'url("data:image/' + mimeType + ';base64,' + body.toString('base64') + '")');
              mCallback(null);
            } else {
              mCallback(err);
            }
          });
        }, function(err) {
          if (err != null) {
            console.error('error inlining image reference:' + err.message);
          }
          // all images inlined as base64, set the full style text
          style.text(styleText);
          aCallback(null);
        });
      }, function(err) {
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


var getRemoteResource = function(path, cb) {
    var options = {};
    if ('object' === typeof path) {
      options = path;
    } else {
      options.uri = path;
    }

    request(options, function(err, res, body) {
      //console.log('got response for link:' + options.uri + ' res.statusCode:' + res.statusCode + ' body.length:' + body.length);
      cb(err, res, body);
    });
    };