var winston = require('winston');
var moment = require('moment');
var _ = require('underscore');


var timestamp = function(){
  return moment.utc().format();
}
var config = {
  transports: [
    //    new (winston.transports.Console)({ level: 'info' ,timestamp:timestamp})
    new (winston.transports.Console)({ timestamp:timestamp})
    //new (winston.transports.File)({ filename: 'somefile.log' })
  ]};

var logger = function() {
  var mixin = {
    current :  0,
    MAX : Math.pow(2,16),
    getDevId : function(params){
      var cuid ="";
      if(params && _.isObject(params) && params.hasOwnProperty("__fh")) {
        cuid = params.__fh.cuid + " ";
      }
      return cuid;
    },
    getId : function () {
      var id = this.current;
      if(this.current == this.MAX) {
        this.current= 0;
      } else {
        this.current++;
      }
      return id;
    },
    onStart :function (name,msg, params) {
      var memo;
      try {
        memo = {
          "req" : this.getId(),
          "started": new Date().getTime(),
          "name": name,
          "device": this.getDevId(params),
          took : function (){
            return " : " + (new Date().getTime() - this.started) + " ms"
          }
        }
        memo.title = "(" + memo.req + ") " + memo.name + " " + memo.device ;
        this.debug(memo.title + "starting " + (msg ? msg : ""));
      }catch(e) {
        console.error("error logging onStart",e);
      }
      return memo;
    },
    onStop : function (memo,msg) {
      try {
        this.debug(memo.title + "completed " + (msg ? ": " + msg : "") + memo.took());
      }catch(e) {
        console.error("error logging onStop");
      }
    },
    onError : function (memo,e) {
      try {
        this.error(memo.title + "error " + (e && e.stack ? e.stack : e)+ " "+memo.took());
        if(console.trace) {
          console.trace(memo.title + "error ",e);
        }
      }catch(e) {
        console.error("error logging onError");
      }
    },
    onException : function (memo,err) {
      try {
        this.error(memo.title + "exception " + (err && err.stack ? err.stack : err) + " " + memo.took());
        if(console.trace) {
          console.trace(memo.title + "exception ",err);
        }
      }catch(e) {
        console.error("error logging onException");
      }
    }
  };
  var l = new (winston.Logger)(config);
  return _.extend(l,mixin);
};

exports.logger = logger();
