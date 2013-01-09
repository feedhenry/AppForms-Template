//$fh.ready(function() {
(function () {
  var config = {
    "log_line_limit": 300,
    "email": "test@example.com"
  };

  var _dbg = function(){
    var clazz = arguments[0];
    var self = arguments[1];
    var func = arguments[2];
    var args = Array.prototype.slice.call(arguments,3)[0];

    var strArr = _stringify.apply(this,args);
    strArr.unshift(new Date().toUTCString() + ' ::');
    var str = strArr.join(' ');

    // output to ui, which will also be our in-memory store
    // and remove any lines over the line limit
    $("#logger .logs").prepend($("<p>").addClass(clazz).text(str));
    $('#logger .logs p:gt(' + (config.log_line_limit - 1) + ')').remove();

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
        return JSON.stringify(arg);
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
        $fh.send({
          "type": "email",
          "to": config.email,
          "subject": "Wufoo App Logs",
          "body": str
        }, function () {
          window.alert('LOGS SENT OK');
        }, function (msg) {
          window.alert('ERROR SENDING LOGS (1200): msg=' + JSON.stringify(msg));
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

