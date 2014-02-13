ConfigModel = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function () {
      $fh.logger.info('ConfigModel :: change=' + JSON.stringify(this.attributes));
      $fh.data({
        act: 'save',
        key: 'client_config',
        val: JSON.stringify(this.attributes)
      }, function () {
        // saved ok
      }, function (msg, err) {
        $fh.logger.error('ERROR: saving client_config to local storage :: ', msg);
      });
    });
  },
  getValueOrDefault: function (key) {
    try {
      var value= (this.attributes.hasOwnProperty(key)  ? this.get(key) : this.get('defaults')[key]) ;
      return value;
    } catch(e) {
      return null;
    }
  },
  loadConfig: function () {
    var self = this;
    self.set($fh.forms.config.props);
    self.trigger("config:loaded");
  }
});

App.config = new ConfigModel();