ConfigModel = Backbone.Model.extend({
  initialize: function () {
    var self = this;

    $fh.ready(function () {
      //initialise config
      $fh.data({
        act: 'load',
        key: 'client_config'
      }, function (res) {
        if (res && res.val && res.val !== '') {
          try {
            // overwrite config with whats in local storage. May be overwritten again by initial act, depending on local storage vs. act call time.
            self.set(JSON.parse(res.val));
          } catch(e) {
            //log error, but no action
            console.log('ERROR: parsing config from local storage. Using config defaults:', e);
          }
        } else {
          console.log('No config in local storage. Using config defaults');
        }
      });
    });

    this.on('change', function () {
      $fh.data({
        act: 'save',
        key: 'client_config',
        val: JSON.stringify(this.attributes)
      }, function () {
        // saved ok
      }, function (msg, err) {
        console.error('ERROR: saving client_config to local storage :: ', msg);
      });
    });
  }
});

App.config = new ConfigModel();