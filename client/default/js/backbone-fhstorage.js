/**
 * @fileOverview This is an adaptation of Backbone.localStorage, edited to work
 *     with the asynchronous FeedHenry local data storage API.
 * A cloud action can be linked with the store to allow syncing to cloud
 * @version 0.2
 * @author gareth.cpm@gmail.com (Gareth Murphy), david.martin@feedhenry.com
 */


// Generate four random hex digits (for GUIDs).
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// Our Store is represented by a single JS object in FeedHenry's data store.
// Create it with a meaningful name, like the name you'd give a table.
var FHBackboneSyncStore = function(name, act) {
  var self = this;
  this.localStoreVersion = '0.2'; // versioning to force a nuke of local store DANGER!!!
  this.name = name;
  this.act = act || null;
  this.data = {};
  this.collection = null;

  $fh.ready(function () {
    $fh.data({
      key: self.name + self.localStoreVersion
    }, function(res) {
      try {
        if (res.val && res.val !== '') {
          self.data = JSON.parse(res.val);
        }
      } catch(e) {
        // leave data as default
      }

      var dataEmpty = _.isEmpty(self.data);

      // if theres an act defined, call it
      if (self.act !== null) {
        $fh.act({
          act: self.act
        }, function (res) {
          if (res && res.data) {
            var dataObj = {};
            _(res.data).forEach(function (item, index) {
              dataObj[item.id] = item;
            });
            self.data = dataObj;
          }

          // initialise data and save it
          self.save(function () {
            if (dataEmpty) {
              self.isLoaded = true;
              self.trigger('loaded');
            } else {
              self.collection.fetch();
              console.log('auto fetch/update');
            }
          });
        }, function (msg, err) {
          // if there's no data yet, trigger loadFaild
          if (dataEmpty) {
            self.trigger('loadFailed');
          }
          console.error('ERROR: act call :: msg:', msg, ' err:', err);
        });
        // }, 5000);
      }

      // should we trigger loaded message now, or leave it to be triggered in act callback?
      // depends on whether there is an act and if we have data from local store already
      if (self.act === null || !dataEmpty) {
        self.isLoaded = true;
        self.trigger('loaded');
      }
      // data loaded, trigger ready
    }, function(msg, err) {
      // if a cloud act is defined, call it to populate data
      self.trigger('loadFailed');
    });
  });
};

_.extend(FHBackboneSyncStore.prototype, Backbone.Events);

_.extend(FHBackboneSyncStore.prototype, {

  // Save the current state of the Store to the FeedHenry local this.data store.
  save: function(cb) {
    var self = this;
    $fh.data({
      act:'save',
      key: this.name + this.localStoreVersion,
      val: JSON.stringify(this.data)
    }, function () {
      cb(null);
    }, function(msg, err) {
      var errMsg = 'ERROR saving data :: msg:' + msg + ' err:' + err;
      self.trigger('error', errMsg);
      console.error(errMsg);
      cb(err);
    });
  },

  /* Add a model, giving it a (hopefully) unique GUID, if it doesn't already
   have an id of it's own. */
  create: function(model, cb) {
    if (!model.id) model.set(model.idAttribute, guid());
    this.data[model.id] = model;
    this.save(function (err) {
      return cb(err, model);
    });
  },

  // Update a model by replacing its copy in`this.data`.
  update: function(model, cb) {
    this.data[model.id] = model;
    this.save(function (err) {
      return cb(err, model);
    });
  },

  // Retrieve a model from `this.this.this.data` by id.
  find: function(model, cb) {
    return cb(null, this.data[model.id]);
  },

  // Return the array of all models currently in storage.
  findAll: function(cb) {
    return cb(null, _.values(this.data));
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model, cb) {
    delete this.data[model.id];
    this.save(function (err) {
      return cb(err, model);
    });
  }

});

/* Override Backbone.sync to use delegate to the model or collection's
 FeedHenry this.data store property, which should be an instance of Store. */
Backbone.sync = function(method, model, options) {

  var store = model.fhStorage || model.collection.fhStorage;
  // set collection on fhstorage
  if (store.collection === null) {
    store.collection = model.collection || model;
  }

  function storeCb(err, resp) {
    if (err || resp == null) return options.error("Record not found");
    return options.success(resp);
  }

  if (store != null) { // only try load if a store is defined
    if (store.isLoaded) {
      switch(method) {
        case "read": return model.id ? store.find(model, storeCb) : store.findAll(storeCb);
        case "create": return store.create(model, storeCb);
        case "update": return store.update(model, storeCb);
        case "delete": return store.destroy(model, storeCb);
      }
    } else {
      options.error("Store is not loaded yet. Listening for 'loaded' event?");
    }
  } else {
    options.error("Store is null. Is it assigned to model/collection as 'fhStorage'?");
  }
};