var https = require('https');
var querystring = require('querystring');
var wufoo_config = require('../wufoo_config.js').wufoo_config;

var api_config = {
  "login_host": "secure.wufoo.eu",
  "login_path": "/login/",
  "login_cookies": ["PHPSESSID", "wuSecureCookie"],
  "rules_path": "/rules/<form_hash>/"
};

function login(email, password, cb) {
  if (email == null || password == null) {
    return cb({
      "error": "email/password must be defined in wufoo config",
      "code": 1004
    });
  }

  function parseCookie(cookie) {
    var parsed = {};
    // wuSecureCookie=7%9Fg%91%EF%7E8%DF%E6w%B2%E8w%A5%84%2B; expires=Fri, 23-Nov-2012 13:58:14 GMT; path=/; domain=.wufoo.com; secure
    cookie.trim().split(';').forEach(function (item, i) {
      var keyval = item.trim().split('=');
      parsed[keyval[0]] = keyval[1];
    });
    //console.log('parsed:', parsed);
    return parsed;
  }

  function parseCookies(cookies) {
    var parsedCookies = {};

    cookies.forEach(function (item, i) {
      var cookie = parseCookie(item);
      var cookieName = Object.keys(cookie)[0];
      parsedCookies[cookieName] = cookie[cookieName];
    });

    return parsedCookies;
  }

  function getLoginCookies(cookies) {
    var loginCookies = [];
    var parsedCookies = parseCookies(cookies);

    api_config.login_cookies.forEach(function (item, i) {
      // if we have this required cookie, add it to response
      if (parsedCookies[item] != null) {
        var tempCookie = {};
        tempCookie[item] = parsedCookies[item];
        loginCookies.push(tempCookie);
      }
    });

    return loginCookies;
  }

  var postData = {
    "email": email,
    "password": password
  };
  console.log('login request');
  var req = https.request({
    "host": api_config.login_host,
    "port": 443,
    "path": api_config.login_path,
    "method": 'POST',
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }, function(res) {
    res.on('end', function() {
      // successful login if status 302 & have the correct cookies being set
      var cookies = res.headers['set-cookie'];
      var loginCookies = getLoginCookies(cookies);
      //console.log('loginCookies:', loginCookies);
      if (302 === res.statusCode && (loginCookies.length === api_config.login_cookies.length)) {
        return cb(null, loginCookies);
      } else {
        return cb({
          "error": "Login failed", // invalid credentials or something up with wufoo
          "code": 1000
        });
      }
    });
  });

  req.on('error', function(e) {
    console.error(e);
    return cb(e);
  });

  //console.log('querystring.stringify(postData):', querystring.stringify(postData));
  req.write(querystring.stringify(postData));

  req.end();
}

exports.getRules = function (form_hash, cb) {
  console.log('getRules()');
  login(wufoo_config.email, wufoo_config.password, function (err, cookies) {
    if (err) return cb(err);

    // create cookie string for sending along in this request
    var cookieString = '';
    cookies.forEach(function (item, i) {
      var cookieName = Object.keys(item)[0];
      cookieString += cookieName + '=' + item[cookieName] + ';';
    });
    console.log('cookieString:', cookieString);

    var req = https.request({
      "host": wufoo_config.api_domain,
      "port": 443,
      "path": api_config.rules_path.replace('<form_hash>', form_hash),
      "method": 'GET',
      "headers": {
        "Cookie": cookieString
      }
    }, function(res) {
      var resBody = '';
      res.on('data', function (chunk) {
        resBody += chunk;
      });

      res.on('end', function() {
        if (200 === res.statusCode) {
          var rulesMatch = resBody.match(/__RULES\s*=\s*(.*?);*?\n/);
          if (rulesMatch && rulesMatch.length > 1) {
            try {
              var rules = JSON.parse(rulesMatch[1]);
              return cb(null, rules);
            } catch (e) {
              return cb({
                "error": "Rules could not be parsed from response (" + e + ")",
                "code": 1003
              });
            }
          } else {
            return cb({
              "error": "Rules could not be found in response",
              "code": 1002
            });
          }
        } else {
          return cb({
            "error": "Rules endpoint failed. Status(" + res.statusCode + ") resBody:(" + resBody + ")",
            "code": 1001
          });
        }
      });
    });

    req.on('error', function(e) {
      console.error(e);
      return cb(e);
    });

    req.end();
  });
};
