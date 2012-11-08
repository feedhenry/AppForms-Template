/**
 * @fileOverview This is an adaptation of Backbone.localStorage, edited to work
 *     with the asynchronous FeedHenry local data storage API.
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
var FHBackboneDataSync = function(name) {
  var self = this;
  this.localStoreVersion = '0.2'; // versioning to force a nuke of local store DANGER!!!
  this.name = name;
  this.data = null;
};

_.extend(FHBackboneDataSync.prototype, Backbone.Events);

_.extend(FHBackboneDataSync.prototype, {

  init: function (cb) {
    var self = this;

    this.data = {};

    $fh.ready(function () {
      console.log('init data for:', self.name);
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
        cb(null);

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

FHBackboneDataSyncFn = function(method, model, options) {
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
    store.init(function (err) {
      if (err) return options.error(err);

      return routeMethod();
    });
  }
  return routeMethod();
};