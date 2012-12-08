$fh = $fh|| {};

if (!$fh.logger) {
  $fh.logger = {};

  $fh.logger._dbg = function(){
    var clazz = arguments[0];
    var self = arguments[1];
    var func = arguments[2];
    var args = Array.prototype.slice.call(arguments,3)[0];
    func.apply(self,args);
    $("#logger  .logs").prepend($("<p>").addClass(clazz).text(args.join(" ")));
  };

  $fh.logger._stringify = function(){
    return _.collect(arguments, function (arg){
      if(!_.isString(arg)   || !_.isNumber(arg)) {
        return JSON.stringify(arg);
      }
      return arg;
    });
  };

  $fh.logger.clear = function(){
    $("#logger .logs").empty();
  };

  $fh.logger.silly= function(){
    $fh.logger._dbg("silly",console,console.trace,$fh.logger._stringify.apply(this,arguments));
  };

  $fh.logger.debug = function(){
    $fh.logger._dbg("debug",console,console.debug,$fh.logger._stringify.apply(this,arguments));
  };

  $fh.logger.info = function(){
    $fh.logger._dbg("info",console,console.debug,$fh.logger._stringify.apply(this,arguments));
  };

  $fh.logger.error= function(){
    $fh.logger._dbg("error",console,console.error,$fh.logger._stringify.apply(this,arguments));
  };

  $fh.logger.warn = function(){
    $fh.logger._dbg("warn",console,console.debug,$fh.logger._stringify.apply(this,arguments));
  };

}