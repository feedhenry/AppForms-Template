var Utils = Utils || {};
(function (self) {
  self.isOnline = function(callback){
    var online = true;
    //first, check if navigator.online is available
    if(typeof navigator.onLine != "undefined"){
      online = navigator.onLine;
    }
    if(online){
      // use phonegap to determine if the network is available
      if(typeof navigator.connection != "undefined") {
        var networkType = navigator.connection.type;
        if(networkType == "none" || networkType == null) {
          online = false;
        }
      }
    }
    callback(online);
  };

  self.truncate= function(o,len, chars) {
    if(o=== null || o === undefined) {
      return "";
    }
    var str = o;
    if(!_.isString(o)) {
      str = JSON.stringify(o);
    }
    len = len || 25;
    chars = chars || '...';
    var slen = str.length;
    if(slen > len ) {
      str = str.substring(0,Math.min(slen, len ) - chars.length )  + chars;
    }
    return str;
  };


  self.isIOS= function() {
    if(typeof device  != "undefined" && device.platform ) {
      return device.platform  === "iPhone";
    }
    return false; // ?
  };

})(Utils);