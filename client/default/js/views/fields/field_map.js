FieldMapView = FieldView.extend({
  extension_type: 'fhmap',

  templates: {
    label: '<label for="<%= id %>"><%= title %></label>',
    mapArea: '<div class="fh_map_canvas"></div>'
  },

  loadingMap: false,

  mapSettings: {
    mapWidth: '100%',
    mapHeight: '300px',
    defaultZoom: 16,
    location: {
      lon: -5.80078125,
      lat: 53.12040528310657
    }
  },

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

  currentLocation: null,

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

    if (!this.loadingMap) {
      this.loadingMap = true;
      setTimeout(function() {
        self.renderMap();
      }, 100);
    } else {
      var timer = 0;
      var interval = setInterval(function() {
        timer += 50;
        if ((typeof google != "undefined") && (typeof google.maps != "undefined") && (typeof google.maps.Map != "undefined")) {
          clearInterval(interval);
          this.renderMap();
        }
        if (timer >= 30000) {
          clearInterval(interval);
          console.log("Failed to load map component.");
        }
      }, 50);
    }

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  renderMap: function() {
    var self = this;
    var mapCanvas = $('.fh_map_canvas', this.el);
    var options = this.parseCssOptions();

    // Merge
    this.mapSettings = _.defaults(options, this.mapSettings);

    $fh.geo({
      interval: 0
    }, function(geoRes) {
      // Override with geo, otherwise use defaults      
      self.mapSettings = _.defaults({
        location: {
          lat: geoRes.lat,
          lon: geoRes.lon
        }
      }, self.mapSettings);

      $fh.map({
        target: mapCanvas[0],
        lon: self.mapSettings.location.lon,
        lat: self.mapSettings.location.lat,
        zoom: self.mapSettings.defaultZoom
      }, function(res) {
        var map = res.map;
        var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: "Drag this to set position"
        });

        var matches;
        if (self.currentLocation && (matches = self.currentLocation.match(/\((.+),(.+)\)/))) {
          var latlon = new google.maps.LatLng(matches[1], matches[2]);
          marker.setPosition(latlon);
          map.setCenter(latlon);
        } else {
          // Set initial location
          self.currentLocation = marker.getPosition().toString();
        }
        google.maps.event.addListener(marker, "dragend", function() {
          self.currentLocation = marker.getPosition().toString();
          self.contentChanged();
        });
      }, function(err) {
        console.log(err);
      });
    });


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