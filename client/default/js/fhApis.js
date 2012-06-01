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
				if (classes.indexOf(this.bindings[j]) !== -1) {
					var element = neededApis[i].getElementsByTagName('input')[0];
					jQuery('#'+element.id).unbind('click');
					this.bindFunction(this.bindings[j], element.id);
					j = this.bindings.length;
				}
			}
		}
	},

	bindFunction: function(className, id) {
		var fn = '';
		var bindFn = function(id, fnName) {
				jQuery('#'+id).bind('click', function() {
					apiController[fnName](id);
				});
			};
		switch (className) {
			case 'fhgeo':
				fn = 'fhGeo';
				break;
			case 'fhcam':
				fn = 'fhCam';
				break;
		}
		bindFn(id, fn);
	},

	// Returns Lat and Long as sting
	fhCam: function(id) {
		var field = jQuery('#' + id)[0];
		$fh.cam({
			act: "picture",
			source: "photo",
			uri: true
		}, function(res) {
			if (res.uri) {
				var filePath = res.uri;
				field.value = filePath.toString();
			}
		}, function(msg, err) {
			field.value = 'no image could be loaded/taken';
		})
	},

	// Returns Lat and Long as sting
	fhGeo: function(id) {
		var field = jQuery('#' + id)[0];
		debugger;
		$fh.geoip(function(res) {
			var str = '';
			str += 'Longitude: ' + res.longitude + ', ';
			str += 'Latitude: ' + res.latitude;
			console.log(str);
			field.value = str;
		}, function(msg, err) {
			field.value = 'Location could not be determined';
		});
	},
}
