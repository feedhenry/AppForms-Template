/**
 * @fileOverview This is an adaptation of Backbone.localStorage, edited to work
 *     with the asynchronous FeedHenry local data storage API.
 * @version 0.1
 * @author gareth.cpm@gmail.com (Gareth Murphy)
 */


// HELPER FUNCTIONS

/**
 * A convenience wrapper around the 'load' variation of the $fh.data function,
 * designed to be forcibly synchronous.
 *
 * @param {String} theKey The key of the data you want to retrieve from storage.
 * @return {String} The value you requested.
 */
function fhGet(theKey) {
  var response;

  // We effectively force this function into being synchronous, by creating an
  // inner function which only runs after being called twice.
  var returnResponse = _.after(2, function() {
    return response;
  });

  $fh.data({
    key:theKey
  }, function(res) {
    response = res;
    returnResponse(); // Once...
  }, function(msg, err) {
    $fh.log('ERROR: ' + msg);
  });
  return returnResponse(); // And twice.
}

/**
 * A convenience wrapper around the 'save' variation of the $fh.data function.
 *
 * @param {String} theKey The key you'll be storing your data under.
 * @param {String} theVal The data itself, in String form.
 * @param {Function} callback A function you wish to call upon save success.
 */
function fhPut(theKey, theVal, callback) {
  $fh.data({
    act:'save',
    key:theKey,
    val:theVal
  }, callback, function(msg, err) {
    $fh.log('ERROR: ' + msg);
  });
}

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
var Store = function(name) {
  this.name = name;
  var store = fhGet(this.name).val;
  this.data = (store && JSON.parse(store)) || {};
};

_.extend(Store.prototype, {

  // Save the current state of the Store to the FeedHenry local this.data store.
  save: function() {
    fhPut(this.name, JSON.stringify(this.data));
  },

  /* Add a model, giving it a (hopefully) unique GUID, if it doesn't already
   have an id of it's own. */
  create: function(model) {
    if (!model.id) model.set(model.idAttribute, guid());
    this.data[model.id] = model;
    this.save();
    return model;
  },

  // Update a model by replacing its copy in`this.data`.
  update: function(model) {
    this.data[model.id] = model;
    this.save();
    return model;
  },

  // Retrieve a model from `this.this.this.data` by id.
  find: function(model) {
    return this.data[model.id];
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _.values(this.data);
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    delete this.data[model.id];
    this.save();
    return model;
  }

});

/* Override Backbone.sync to use delegate to the model or collection's
 FeedHenry this.data store property, which should be an instance of Store. */
Backbone.sync = function(method, model, options) {

  var resp;
  var store = model.fhStorage || model.collection.fhStorage;

  switch(method) {
    case "read":
      resp = model.id ? store.find(model) : store.findAll();
      break;
    case "create":
      resp = store.create(model);
      break;
    case "update":
      resp = store.update(model);
      break;
    case "delete":
      resp = store.destroy(model);
      break;
  }

  if (resp) {
    options.success(resp);
  } else {
    options.error("Record not found");
  }
};