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
    defaultZoom: 3,
    location: {
      lon: -5.80078125,
      lat: 53.12040528310657
    }
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
      this.renderMap();
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

      // Set initial location
      self.currentLocation = marker.getPosition().toString();

      google.maps.event.addListener(marker, "dragend", function() {
        self.currentLocation = marker.getPosition().toString();
      })
    }, function(err) {
      console.log(err);
    });
  },

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        $("#" + id).val(val);
      });
    }
    value = {};
    value[this.model.get('ID')] = this.currentLocation;
    return value;
  }
});