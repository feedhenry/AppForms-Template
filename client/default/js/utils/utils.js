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
  }
}

var utils = UtilsFunctions;