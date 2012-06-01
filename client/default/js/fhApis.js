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
    alert();
		var field = jQuery('#' + id)[0];
		var source = 'camera';
		// Ask for source of photo
		navigator.notification.confirm(
			'Would you like to take a picture or choose from Gallery?', 
			function(btn){
				if(btn==2){
					source = 'photo';
				}
				if(btn==3){
					source = '';
				}
			}, 
			'Choose Source', 
			"Camera,Gallery,Cancel");
		if(source===''){
			return;
		}
		$fh.cam({
			act: "picture",
			source: source,
			uri: true
		}, function(res) {
			if (res.uri) {
				var filePath = res.uri;
				field.value = filePath.toString();
				ield.blur();
				field.disabled = 'true';
			}
		}, function(msg, err) {
			field.value = 'No image could be loaded/taken';
		});
	},

	// Returns Lat and Long as sting
	fhGeo: function(id) {
		var field = jQuery('#' + id)[0];
		$fh.geoip(function(res) {
			var str = '';
			str += 'Longitude: ' + res.longitude + ', ';
			str += 'Latitude: ' + res.latitude;
			console.log(str);
			field.value = str;
			field.blur();
			field.disabled = 'true';
		}, function(msg, err) {
			field.value = 'Location could not be determined';
		});
	},
}
