ConfigModel = Backbone.Model.extend({
  initialize: function () {
    var self = this;

    $fh.ready(function () {
      // TODO : check if there is a better way of ensuring fh.data has been monkey patched
      overrideFHData();
      //initialise config
      $fh.data({
        act: 'load',
        key: 'client_config'
      }, function (res) {
        $fh.logger.info('ConfigModel :: loaded=' + res.val);
        if (res && res.val && res.val !== '') {
          try {
            // overwrite config with whats in local storage. May be overwritten again by initial act, depending on local storage vs. act call time.
            $fh.logger.debug('ConfigModel :: loaded=' + res.val);
            var read =JSON.parse(res.val);
            self.set(read);
          } catch(e) {
            //log error, but no action
            $fh.logger.error('ERROR: parsing config from local storage. Using config defaults:', e);
          }
        } else {
          $fh.logger.warn('No config in local storage. Using config defaults');
        }
      });
    });

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
  }
});

App.config = new ConfigModel();