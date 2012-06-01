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
					jQuery('#' + element.id).bind('click', function() {
						this.bindFunction(this.bindings[j]
					});
				}
			}
		}
	},

	bindFunction: function(className) {
		switch (className) {
		case 'fhgeo':
			return this.fhGeo;
			break;
		}
	},

	// Returns Lat and Long as sting
	fhGeo: function() {
		$fh.geoip(function(res) {
			var str = '';
			str += 'Longitude: ' + res.longitude + ', ';
			str += 'Latitude: ' + res.latitude;
			return str;
		}, function(msg, err) {
			return 'location could not be determined';
		});
	},
}
