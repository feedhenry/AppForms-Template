/*
 * File that holds bindings for APIs
 */
// Returns Lat and Long as sting

var fhGeo = function (id) {
  $fh.geoip(function(res) {
		var str = '';
		str += 'Longitude: ' + res.longitude + ', ';
		str += 'Latitude: ' + res.latitude;
		return str;
	}, function(msg, err) {
		return 'location could not be determined';
	});
}, 

var fhCam = function(id) {
	$fh.cam({
		act: "picture"
	}, function(res) {
		var img = new Image();
		img.src = "data:image/" + res.format + ";base64," + res.b64;
	})
}


var apiController = {
	bindings: ['fhgeo', 'fhcam'],

	addApiCalls: function() {
		var neededApis = document.body.getElementsByClassName('$fh');
		debugger;
		for (var i = 0; i < neededApis.length; i++) {
			var classes = neededApis[i].className;
			for (var j = 0; j < this.bindings.length; j++) {
				if (classes.indexOf(this.bindings[j])); {
					var element = neededApis[i].getElementsByTagName('input')[0];
					this.bindFunction(id, this.bindings[j]);
				}
			}
		}
	},

	bindFunction: function(id, apiName) {
		switch (apiName){
			case 'fhgeo':
				jQuery('#'+id).bind('click', fhGeo(id)});
				break;
			case 'fhcam':
				jQuery('#'+id).bind('click', fhCam(id)});
		}
	},
}
