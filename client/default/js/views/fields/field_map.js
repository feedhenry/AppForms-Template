FieldMapView = FieldView.extend({
  extension_type: 'fhmap',

  templates: {
    label: '<label for="<%= id %>"><%= title %></label>',
    mapArea: '<div class="fh_map_canvas"></div>'
  },

  mapSettings: {
    mapWidth: '100%',
    mapHeight: '300px',
    defaultZoom: 16,
    location: {
      lon: -5.80078125,
      lat: 53.12040528310657
    }
  },

  currentLocation: null,

  parseCssOptions: function() {
    var options = {
      defaultZoom: null
    };

    var classNames = this.model.get('ClassNames'),
      parts, val;
    if (classNames !== '') {
      var classes = classNames.split(' ');
      _(classes).forEach(function(className) {
        if (className.indexOf("fhzoom") != -1) {
          parts = className.split('=');
          val = parseInt(parts[1], 10);

          if (_.isNumber(val)) {
            options.defaultZoom = val;
          }
        }
      });
    }

    return options;
  },

  initialize: function() {
    var self = this;
    FieldView.prototype.initialize.call(this);
    this.on('visible', function() {
      self.show();
    });
  },

  render: function() {
    var self = this;

    // Add label
    this.$el.append(_.template(this.templates.label, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add map canvas
    this.$el.append(_.template(this.templates.mapArea, {}));

    $('.fh_map_canvas', this.el).css({
      width: self.mapSettings.mapWidth,
      height: self.mapSettings.mapHeight
    });

    // add to dom
    this.options.parentEl.append(this.$el);
  },

  show: function() {
    FieldView.prototype.show.call(this);
    this.renderMap();
  },

  renderMap: function() {
    var self = this;
    var mapCanvas = $('.fh_map_canvas', this.el);
    var options = this.parseCssOptions();

    // Merge
    this.mapSettings = _.defaults(options, this.mapSettings);

    navigator.geolocation.getCurrentPosition(function(geoRes) {
      // Override with geo, otherwise use defaults
      var location ={lat:geoRes.coords.latitude,lon:geoRes.coords.longitude};

      var matches;
      if (self.currentLocation && (matches = self.currentLocation.match(/\((.+),(.+)\)/))) {
        location= {lat:matches[1], lon:matches[2]};
      }

      self.mapSettings = _.defaults({
        location: location
      }, self.mapSettings);

      $fh.map({
        target: mapCanvas[0],
        lon: self.mapSettings.location.lon,
        lat: self.mapSettings.location.lat,
        zoom: self.mapSettings.defaultZoom
      }, function(res) {
        self.map = res.map;
        var marker = new google.maps.Marker({
          position: self.map.getCenter(),
          map: self.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: "Drag this to set position"
        });
        self.currentLocation = marker.getPosition().toString();

        google.maps.event.addListener(marker, "dragend", function() {
          self.currentLocation = marker.getPosition().toString();
          self.contentChanged();
        });
      }, function(err) {
        $fh.logger.debug(err);
      });
    });
  },

  mapResize: function() {
    if (this.map != null) {
      $fh.logger.debug('mapResize');
      // trigger resize event
      google.maps.event.trigger(this.map, 'resize');
      // recenter map
      this.map.setCenter(new google.maps.LatLng(this.mapSettings.location.lat, this.mapSettings.location.lon));
    }
  },

  addValidationRules: function() {
    // You can't have a required map, since there's no input. Also there's always a default location set.
  },

  value: function(value) {
    if (value && !_.isEmpty(value) && value[this.model.get('ID')]) {
      var val = value[this.model.get('ID')];
      if (/\((.+),(.+)\)/.test(val)) {
        this.currentLocation = val;
      }
    }
    value = {};
    value[this.model.get('ID')] = this.currentLocation;
    return value;
  }
});