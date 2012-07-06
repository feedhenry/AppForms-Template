var UtilsFunctions = {
  getLocation: function(callback){
    $fh.geo({act:'register', interval: 0}, function(location){
        callback(location);
      }, function(err){
        if(typeof navigator.geolocation != "undefined"){
            navigator.geolocation.getCurrentPosition(function(position){
              var location = {lon: position.coords.longitude, lat: position.coords.latitude};
              callback(location);
            })
          }
      });
  },

  isOnline: function(callback){
    var online = true;
    //first, check if navigator.online is available
    if(typeof navigator.onLine != "undefined"){
      online = navigator.onLine;
    }
    if(online){
      //use phonegap to determin if the network is available
      if(typeof navigator.network != "undefined" && typeof navigator.network.connection != "undefined"){
        var networkType = navigator.network.connection.type;
        if(networkType == "none" || networkType == null){
          online = false;
        }
      }
    }
    callback(online);
  },

  isValid: function(value){
    var valid = false;
    if(value && typeof value != "undefined" && value != ""){
      valid = true;
    }
    return valid;
  }
}

var utils = UtilsFunctions;