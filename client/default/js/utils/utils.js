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
        if(networkType == navigator.network.connection.none){
          online = false;
        }
        callback(online);
      } else {
        //no phonegap available, send ajax call to google to see if a connection is available
        $.ajax({
          url: 'http://www.google.com',
          async: true,
          cache: false,
          timeout: 1000,
          complete: function(xhr, status){
            if(status != "success" && status != "notmodified"){
              //have trouble connecting to google, treat it as a network issue
              online = false;
            }
            callback(online);
          }
        })

      } 
    } else {
      callback(online);
    }
  }
}

var utils = UtilsFunctions;