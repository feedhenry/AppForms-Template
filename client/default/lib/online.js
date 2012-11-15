var Utils = Utils || {};
(function (self) {
  self.isOnline = function(callback){
    var online = true;
    //first, check if navigator.online is available
    if(typeof navigator.onLine != "undefined"){
      online = navigator.onLine;
    }
    if(online){
      //use phonegap to determin if the network is available
      if(typeof navigator.network != "undefined" && typeof navigator.network.connection != "undefined"){
        var networkType = navigator.network.connection.type;
        if(networkType == "none" || networkType == null) {
          online = false;
        }
      }
    }
    callback(online);
  };
})(Utils);