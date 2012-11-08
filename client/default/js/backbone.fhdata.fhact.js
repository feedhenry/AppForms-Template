/**
 * @fileOverview This is an adaptation of FHBackboneDataActSync, edited to allow
 * a cloud action to be linked with the store for syncing down from cloud
 *
 * @version 0.3
 * @author david.martin@feedhenry.com
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
var FHBackboneDataActSync = function(name, actList, actRead, idField, versionField) {
  var self = this;
  this.localStoreVersion = '0.3'; // versioning to force a nuke of local store DANGER!!!
  this.name = name;
  this.data = null;
  this.actList = actList;
  this.actRead = actRead;
  this.idField = idField;
  this.versionField = versionField;
};

_.extend(FHBackboneDataActSync.prototype, Backbone.Events);

_.extend(FHBackboneDataActSync.prototype, {

  init: function (model, cb) {
    var self = this;

    this.data = {};

    $fh.ready(function () {
      console.log('init data for:"', self.name, '"');
      $fh.data({
        key: self.name + self.localStoreVersion
      }, function(res) {
        try {
          if (res.val && res.val !== '') {
            self.data = JSON.parse(res.val);
            console.log('found data in local storage for "', self.name, '"');
          }
        } catch(e) {
          // leave data as default
        }
        // if no data, defer cb until we get from server
        var dataEmpty = _.isEmpty(self.data);
        if (!dataEmpty) {
          cb(null);
        }

        // get data from server
        $fh.act({
          act: self.actList
        }, function (res) {
          if (res && res.error) {
            if (!dataLoaded) {
              return cb(res.error);
            }
            return;
          }
          
          // update client config if its in response
          if (res && res.config) { // NOTE: no versioning on config so ovewrite it always
            console.log('updating config');
            App.config = res.config;
          }
          // update data if there is any
          var dataUpdated = false;
          if (res && res.data) {
            var dataObj = {};
            _(res.data).forEach(function (item, index) {
              var currentData = self.data[item[self.idField]];
              // update data if data doesn't exist already, or if version is different, otherwise no change to data
              if (currentData == null || (currentData[self.versionField] !== item[self.versionField])) {
                console.log('updating data for:"', self.name, '"');
                dataUpdated = true;
                self.data[item[self.idField]] = item;
              }
            });
          }
          if (dataEmpty) {
            // data inited for first time. save to local storage and callback straight away (no need to wait for save)
            self.save(function () {
              console.log('inited data for "', self.name, '" saved to local storage');
            });
            cb(null);
          } else {
            if (dataUpdated) {
              // data already initialised from local storage, need to update the data and let subsequent events on models
              // take care of updating views i.e. don't call cb
              // TODO: ?
              self.save(function () {
                console.log('updated data for "', self.name, '" saved to local storage');
              });
            }
          }
        }, function (msg, err) {
          if (dataEmpty) {
            cb(msg + '::' + err);
          }
        });

      }, function(msg, err) {
        cb(msg + '::' + err);
      });
    });
  },

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
  find: function(modelToFind, cb) {
    var self = this;
    var modelData = this.data[modelToFind.id];
    var dataLoaded = modelData.fh_full_data_loaded;

    // kick off act call to get/update full data
    $fh.act({
      act: self.actRead,
      req: {
        id: modelData[self.idField]
      }
    }, function (res) {
      if (res && res.error) {
        if (!dataLoaded) {
          return cb(res.error);
        }
        return;
      }
      // update data if there is any
      var dataUpdated = false;
      // only update data if we have full data for first time, or if version fields are different on what we have vs
      // what we got
      if (res && res.data && (!dataLoaded || (res.data[self.versionField] !== self.data[modelToFind.id][self.versionField]))) {
        dataUpdated = true;
        console.log('updating data for:"', self.name, '" id:"', modelData[self.idField], '"');
        self.data[modelToFind.id] = res.data;
      }
      if (!dataLoaded) {
        self.data[modelToFind.id].fh_full_data_loaded = true;
        // save data to local storage, and callback straight away (no need to wait til save finished)
        self.save(function () {
          console.log('updated data for:"', self.name, '" id:"', modelToFind.id, '" saved to local storage');
        });
        return cb(null, self.data[modelToFind.id]);
      } else if (dataUpdated) {
        // data already initialised from local storage, need to update the data in local storage and let subsequent
        // events on model take care of updating views i.e. don't call cb
        self.save(function () {
          console.log('updated data for:"', self.name, '" id:"', modelToFind.id, '" saved to local storage');
        });
      }
    }, function (msg, err) {
      if (!dataLoaded) {
        cb(msg + '::' + err);
      }
    });

    // if data already fully loaded, callback straight away instead of waiting for fhact response
    if (dataLoaded) {
      return cb(null, modelData);
    }
  },

  // Return the array of all models currently in storage as we're working with a collection
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

FHBackboneDataActSyncFn = function(method, model, options) {
  var store = model.store || model.collection.store;

  function storeCb(err, resp) {
    if (err || resp == null) return options.error("Record not found");
    return options.success(resp);
  }

  function routeMethod() {
    switch(method) {
      case "read": return model.id ? store.find(model, storeCb) : store.findAll(storeCb);
      case "create": return store.create(model, storeCb);
      case "update": return store.update(model, storeCb);
      case "delete": return store.destroy(model, storeCb);
    }
  }

  // if we don't have data yet, initialise it before routing the method
  if (store.data == null) {
    store.init(model, function (err) {
      if (err) return options.error(err);

      return routeMethod();
    });
  }
  return routeMethod();
};