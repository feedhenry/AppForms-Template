/*
 * File that holds bindings for APIs
 */

var config = {
	fields: [],
};



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
					debugger;
					var fn = this.bindFunction(this.bindings[j]);
					jQuery('#' + element.id).bind('click', fn(element.id));
				}
			}
		}
	},

	bindFunction: function(className) {
		switch (className) {
		case 'fhgeo':
			return this.fhGeo;
			break;
		case 'fhcam':
			return this.fhCam;
			break;
		}
	},

	// Returns Lat and Long as sting
	fhCam: function(id) {
		var field = jQuery('#' + id);
		$fh.cam({
			act: "picture",
			source: "photo",
			uri: true
		}, function(res) {
			if (res.uri) {
				var filePath = res.uri;
				field.value = filePath.toString();
			}
		}, function(msg, err){
			field.value = 'no image could be loaded/taken';
		})
	},

	// Returns Lat and Long as sting
	fhGeo: function(id) {
		var field = jQuery('#' + id);
		$fh.geoip(function(res) {
			var str = '';
			str += 'Longitude: ' + res.longitude + ', ';
			str += 'Latitude: ' + res.latitude;
			field.value = str;
		}, function(msg, err) {
			field.value = 'Location could not be determined';
		});
	},
}
