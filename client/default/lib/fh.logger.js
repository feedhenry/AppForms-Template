//$fh.ready(function() {
(function () {

  var _dbg = function(){
    var clazz = arguments[0];
    var self = arguments[1];
    var func = arguments[2];
    var args = Array.prototype.slice.call(arguments,3)[0];

    var strArr = _stringify.apply(this,args);
    strArr.unshift(new Date().toUTCString() + ' ::');
    var str = strArr.join(' ');

    $("#logger .logs").prepend($("<p>").addClass(clazz).text(str));
    if (typeof App.config.get('log_line_limit') !== 'undefined') {
      $('#logger .logs p:gt(' + (App.config.get('log_line_limit') - 1) + ')').remove();
    }

    // output to console
    try{
      func.call(self, str);
    }catch(e){
      if(console && console.log){
        console.log("Failed to log message. Error: " + e.message);
      }
    }
  };

  var _stringify = function(){
    var self = this;
    return _.collect(arguments, function (arg){
      if(_.isArray(arg)) {
        return _.collect(arg, function (v,k){
          return _stringify.call(self,v);
        });
      }
      if(_.isFunction(arg)) {
        return "<func>";
      }
      if(!_.isString(arg)   && !_.isNumber(arg)) {
        if(arg instanceof Error) {
          return JSON.stringify(arg);
        } else {
          return Utils.truncate(JSON.stringify(arg),150);
        }
      }
      return arg;
    });
  };

  var _getLogsAsString = function () {
    var str = '';
    $('#logger .logs p').each(function () {
      str += $(this).text() + '\n';
    });
    return str;
  };

  if (!$fh.logger) {
    $fh.logger = {
      clear : function (){
        $("#logger .logs").empty();
      },
      send: function () {
        var str = _getLogsAsString();

        $fh.env(function (env) {
          $fh.send({
            "type": "email",
            "to": App.config.get('log_email') || 'test@example.com',
            "subject": "Wufoo App Logs",
            "body": "Device Environment:\n" + JSON.stringify(env, null, 2) + "\n\nApp Logs:\n" + str
          }, function () {
            window.alert('LOGS SENT OK');
          }, function (msg) {
            window.alert('ERROR SENDING LOGS (1200): msg=' + JSON.stringify(msg));
          });
        });
      },
      store : function () {
        var str = _getLogsAsString();
        $fh.act({
          "act": "fh_logger_store",
          "req": {
            "logs": str
          }
        }, function (res) {
          if (res && res.status === 'ok') {
            window.alert('LOGS STORED OK: res=' + JSON.stringify(res));
          } else {
            window.alert('ERROR STORED LOGS (1100): res=' + JSON.stringify(res));
          }
        }, function (msg, err) {
          window.alert('ERROR STORED LOGS (1101): msg=' + msg + ', err=' + JSON.stringify(err));
        });
      },
      trace : function (){
        _dbg("trace",console,console.debug,arguments);
      },
      silly : function (){
        _dbg("silly",console,console.trace,arguments);
      },
      debug : function (){
        _dbg("debug",console,console.debug,arguments);
      },
      info : function (){
        _dbg("info",console,console.debug,arguments);
      },
      error : function (){
        _dbg("error",console,console.error,arguments);
      },
      warn : function (){
        _dbg("warn",console,console.debug,arguments);
      }
    };
  }
})();

