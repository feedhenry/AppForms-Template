;(function($){
  $._map_field_loadingMap = false;
  var MapField = function(selector, options){
    var self = this;
    var ctx = $(selector);
    var settings = $.extend(true, {}, $.fn.mapField.defaults, options);
    var initLocation = settings.location;

    function init(){
      var mapCanvas = $('.fh_map_canvas', ctx);
      if(mapCanvas.length == 0){
        var originInput = ctx.find('div').find('input');
        var mapValue = $('<input>',{"class":'mapValue',type:'hidden', name: originInput.attr('name')});
        var mapDiv = $('<div>', {'class':'fh_map_canvas'});
        ctx.find('div').remove();
        ctx.append(mapValue).append(mapDiv);
      } 
      ctx.find('.fh_map_canvas').css({width: settings.mapWidth, height: settings.mapHeight});
      if(!$._map_field_loadingMap){
        $._map_field_loadingMap = true;
        showMap();
      } else {
        var timer = 0;
        var interval = setInterval(function(){
          timer += 50;
          if((typeof google != "undefined") && (typeof google.maps != "undefined")){
            clearInterval(interval);
            showMap();
          }
          if(timer >= 30000){
            clearInterval(interval);
            console.log("Failed to load map component.");
          }
        }, 50);
      }
    }

    function showMap(){
      if(typeof ctx.data('fh_map') == "undefined"){
        var mapDiv = $('.fh_map_canvas', ctx);
        $fh.map({target: mapDiv[0], lon: initLocation.lon, lat: initLocation.lat, zoom: settings.defaultZoom}, function(res){
          var map = res.map;
          ctx.data('fh_map', map);
          var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: "Drag this to set position"
          });
          ctx.data('fh_map_marker', marker);
          google.maps.event.addListener(marker, "dragend", function(){
            var ps = marker.getPosition().toString();
            $('.mapValue', ctx).val(ps);
          })
       }, function(err){
        console.log(err);
       })
      } else {
        var map = ctx.data('fh_map');
        var marker = ctx.data('fh_map_marker');
        var center = new google.maps.LatLng(initLocation.lat, initLocation.lon);
        map.panTo(center);
        marker.setPosition(center);
        $('.mapValue', ctx).val(center.toString());
      }
    }

    function getName(){
      return $('.mapValue', ctx).attr('name');
    }

    function toJSON(){
      return {
        name: getName(),
        value: $('.mapValue', ctx).val(),
        'type': 'text'
      }
    }

    $.extend(self, {
      init: function(){
        init();
      },
      getName: function(){
        return getName();
      },
      toJSON: function(){
        return toJSON();
      }
    })
  }

  $.fn.mapField = function(options){
    var field = null;
    this.each(function(){
      field = new MapField(this, options);
      field.init();
    })
    return field;
  }

  $.fn.mapField.defaults = {
    mapWidth: '100%',
    mapHeight: '300px',
    defaultZoom: 8,
    location: {}
  }
})(jQuery);