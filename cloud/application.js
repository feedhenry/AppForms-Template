var webapp = require('fh-webapp');
var express = require('express');
$fh = require('fh-api');
var mainjs = require('main.js');

var app = express();
app.use('/sys', webapp.sys(mainjs));
app.use('/mbaas', webapp.mbaas);
app.use('/cloud', webapp.cloud(mainjs));

// You can define custom URL handlers here, like this one:
app.use('/', function(req, res){
  res.end('Your Cloud App is Running');
});

module.exports = app.listen(process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001);