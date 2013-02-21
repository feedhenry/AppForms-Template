var util = require('util');
var request = require('request');
var url = require("url");
var wufoo_api = require('./wufoo_client/api.js');
var wufoo_admin = require('./wufoo_client/admin.js');
var wufoo_config = require('./wufoo_config.js');
var async = require('async');
var _ = require('underscore');

function getMinFormData(form) {
  return {
    "Name": form.Name,
    "Hash": form.Hash,
    "DateUpdated": form.DateUpdated
  };
}

exports.getFormTheme = function (params, callback) {
  var form_hash = params.form_hash;

  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  wufoo_api.getFormTheme(form_hash, function (err, body) {
    if (err) return callback(err);
    return callback(null, {data: body});
  });
};

exports.getFormPages = function (params, callback) {
  var form_hash = params.form_hash;

  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  wufoo_api.getFormPages(form_hash, function (err, body) {
    if (err) return callback(err);
    return callback(null, {data: body});
  });
};

exports.getFormFields = function (params, callback) {
  var form_hash = params.form_hash;

  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  wufoo_api.getFormFields(form_hash, function (err, body) {
    if (err) return callback(err);
    return callback(null, {data: body});
  });
};

exports.getForm = function (params, callback) {
  var form_hash = params.id;
  var updateDate = params.version || null;

  // TODO: should client handle error as first params? currently sends 500 if error is first param, 200 if second param
  if (form_hash == null) return callback(null, {
    "error": "form_hash is required"
  });

  // if (['q7p2s7', 'm7p7a7', 'm7p7q7'].indexOf(form_hash) > -1) {
  //   return callback(null, {
  //     "error": "Form '" + form_hash + "' temporarily disabled"
  //   });
  // }

  // asynchronously get:
  // - form data
  // - fields data
  // - rules data
  // - pagination data
  // - theme data
  // and merge together into single json object
  function cbHandler(err, res, cb) {
    // log errors but dont pass back to cb. we can still construct form json
    if (err) {
      console.error('ERROR:', err);
    }
    cb(null, res);
  }

  // get form info first to check last updated date
  wufoo_api.getForm(form_hash, function (err, res) {
    if (err) return callback(null, err);

    // check update date
    console.log('updateDate:', updateDate);
    console.log('res.DateUpdated:', res.DateUpdated);
    if (updateDate != null && updateDate === res.DateUpdated) {
      // update dates are the same, send minimum data rather than waste bandwidth
      return callback(null, getMinFormData(res));
    }

    // update dates are different, get full form data
    var form = res || {};
    async.parallel([function (cb) {
      wufoo_api.getFormFields(form_hash, cb); // essential data, let async pass error to main callback
    }, function (cb) {
      wufoo_admin.getRules(form_hash, function (err, res) {
        // rules aren't essential, so delegate to cbHandler and log errors, if any
        cbHandler(err, res, cb);
      });
    }, function (cb) {
      wufoo_api.getFormPages(form_hash, function (err, res) {
        // pages aren't essential, so delegate to cbHandler and log errors, if any
        cbHandler(err, res, cb);
      });
    }, function (cb) {
      wufoo_api.getFormTheme(form_hash, function (err, res) {
        // theme isn't essential, so delegate to cbHandler and log errors, if any
        cbHandler(err, res, cb);
      });
    }], function (err, results) {
      if (err) {
        return callback(null, err);
      }
      
      var pages = results[2] || {};
      form.PaginationType = pages.PaginationType || 'tab';
      form.NoPageTitles = pages.NoPageTitles || false;
      form.Pages = pages.Pages || [];
      form.Theme = results[3] || "";

      function parseRules(rules) {
        var parsedRules = {};
        // iterate over rules
        rules.forEach(function (rule, rIndex) {
          // iterate over conditions, adding a temp entry for each
          rule.Conditions.forEach(function (condition, cIndex) {
            var tempRule = _.clone(rule); // clone rule as we're manipulating it multiple times potentially depending on # conditions
            tempRule.condition = condition;
            var fieldId = 'Field' + condition.FieldName;
            parsedRules[fieldId] = parsedRules[fieldId] || [];
            parsedRules[fieldId].push(tempRule);
          });
        });

        return parsedRules;
      }

      // add form rules at top level
      var rules = results[1] || {};
      form.Rules = rules.FormRules || [];

      // parse page & field rules
      var tempPageRules = parseRules(rules.PageRules || []);
      //console.log('tempPageRules:', tempPageRules);
      var tempFieldRules = parseRules(rules.FieldRules || []);
      //console.log('tempFieldRules:', tempFieldRules);

      // iterate over fields, moving each into relevant page, or dropping if wufoo default fields
      var fields = results[0] || [];
      var wufoo_default_fields = ['EntryId', 'DateCreated', 'CreatedBy', 'LastUpdated', 'UpdatedBy'];
      fields.forEach(function (field, index) {
        var pageNum = parseInt(field.Page || "1", 10) -1;
        if (wufoo_default_fields.indexOf(field.ID) === -1) {
          // if any field rules mathc this field id, add it to field Rules object
          if (tempFieldRules[field.ID] != null) {
            field.Rules = tempFieldRules[field.ID];
          }
          var rules = _.collect(field.SubFields, function(f){
            return f.ID != field.ID ? tempFieldRules[f.ID] : null;
          });
          rules = _.compact(rules);

          if(rules.length) {
            field.Rules  = _.flatten([field.Rules , rules])
          }

          // add fields to matching page, ensuring page exists on form object
          var page = form.Pages[pageNum] = form.Pages[pageNum] || {};
          page.Fields = page.Fields || [];

          // allow for grouping of fhcam fields
          var addField = true;
          if (field.Type === 'file' && field.ClassNames.indexOf('fhcam') > -1) { // field is fhcam
            var fieldBefore = page.Fields[page.Fields.length - 1];
            if (fieldBefore && fieldBefore.ClassNames.indexOf('fhcam') > -1) { // field before is also fhcam, group it
              addField = false;
              fieldBefore.SubFields = fieldBefore.SubFields || [];
              fieldBefore.SubFields.push(field);
            }
          }
          if (addField) {
            page.Fields.push(field);
          }

          // also, if any page rules matches this field id, add it to the page to (page rules don't have a page id associated with them (why not?), instead have field id of affecting field)
          if (tempPageRules[field.ID] != null) {
            page.Rules = page.Rules || [];
            page.Rules.push.apply(page.Rules, tempPageRules[field.ID]); // push array of rules onto end
          }
        }
      });
      //console.log('form:', form);
      return callback(null, {data:form});
    });
  });
};

//res :: {"Success":1,"EntryId":10,"EntryLink":"https://mnairn.wufoo.com/api/v3/forms/m7x3q1/entries.json?Filter1=EntryId+Is_equal_to+10"}

//{"error":"{"Success":0,"ErrorText":"Errors have been highlighted below.","FieldErrors":[{\"ID\":\"Field116\",\"ErrorText\":\"This field is required. Please enter a value.\"}]}"}

exports.loadChunk = function (form,data,name, callback) {
  $fh.cache({
    act: "load",
    key: data.ref
  }, function(err, json) {
    if (err) {
      return callback(null, {"error": "cached chunk missing for : " + name + "("+ err.toString() + ")"});
    } else {
      if(json !== null) {
        var res =  JSON.parse(json);
        form[name] = res.value;
        return callback(null,form[name]);
      } else {
        return callback(null);
      }
    }
  });
};


exports.cacheForm= function (form, callback) {
  var str = JSON.stringify(form);
  var key = form.form_id;
  var data = form.data;
  if (key === null || data === null) {
    return callback(null, {"error": "key and data are required"});
  } else {
    $fh.cache({
      act: "save",
      key: key,
      value: str
    }, function(err, res) {
      if (err) {
        return callback(null, {"error": err.toString()});
      } else {
        return callback(null, {"Success" : 1});
      }
    });
  }
};

exports.loadForm= function (key, callback) {
  $fh.cache({
    act: "load",
    key: key
  }, function(err, json) {
    if (err) {
      return callback(null, {"error": "cached chunk missing for : " + name + "("+ err.toString() + ")"});
    } else {
      if(json != null) {
        var form =  JSON.parse(json);
        return callback(null,form);
      } else {
        return callback(null);
      }
    }
  });
};
exports.formComplete= function (form) {
  //if(form.stat && form.stat.completedAt) {return true;}
  var incomplete = _.find(form.data, function (v,k) {
    return v.content_type === "ref";
  });
  return !incomplete;
};

exports.cacheChunk= function (chunk, callback) {
  var self = this;
  var key = chunk.key;
  var data = chunk.value;
  if (!key || !data ) {
    return callback(null, {"error": "key and data are required"});
  } else {
    var name = chunk.name;
    var form_id = chunk.form_id;
    this.loadForm(form_id, function (err, form){
      if (err) {
        return callback(null, {"error": err.toString()});
      } else {
        form.stat.msg = name + " starting";
        form.data[name] = data;

        var complete =  self.formComplete(form.data);
        if(complete) {
          form.stat.err = err;
          form.stat.completedAt= Date.now();
        }
        self.cacheForm(form, function (err){self._doPostWufoo(err,form);});
      }
    });
  }
};

exports.checkComplete= function (params, callback) {
  var self = this;
  var key = params.form_id;
      if (err || (form && form.err)) {
        return callback(null, {"error": (err || form.err).toString(), stat: form.stat});
      } else {
        var result = {"Success": 1};
        if(form) {
          result.stat= form.stat;
        }
        return callback(null, result);
      }
  if (!key ) {
    return callback(null, {"error": "key is required"});
  } else {
    this.loadForm(key, function (err, form){
      if (err || (form && form.err)) {
        return callback(null, {"error": (err || form.err).toString(), stat: form.stat});
      } else {
        var result = {"Success": 1};
        if(form) {
          result.stat= form.stat;
        }
        return callback(null, result);
      }
      if (err || (form && form.err)) {
        return callback(null, {"error": (err || form.err).toString(), stat: form.stat});
      } else {
        var result = {"Success": 1};
        if(form) {
          result.stat= form.stat;
        }
        return callback(null, result);
      }
    });
  }
};
exports._doPostWufoo = function (err,form, callback){
  var self = this;
  if(callback == null) {
    callback = function(){};
  }

  if (err) {
    form.stat.err = err;
    form.stat.completedAt= Date.now();
    return self.cacheForm(form , function () {callback(null, {"error": err.toString()});});
  }

  if(form.stat && form.stat.completedAt) {
    return callback(null, {Success :1, CompletedAt : form.stat.completedAt});
  }

  var complete = self.formComplete(form);
  if(complete) {
    var data = form.data;
    var form_hash = form.form_hash;
    process.nextTick(function (){
      return wufoo_api.postFormEntries(form_hash, data, function (err, resp) {
        form.stat.completedAt = Date.now();
        form.stat.err = err;
        setTimeout(function (){
          self.cacheForm(form, function (){});
        }, 35000);
      });
    });
  }
  return callback(null, {Success :1 , msg : "waiting for chunks"});
};

exports.postEntry = function (params, callback) {
  var self = this;
  var form_hash = params.form_hash;
  if (form_hash == null) return callback(null, {"error": "form_hash is required"});
  self.checkComplete(params,function (err,res) {
    if(!err && res && res.stat&& res.stat.completedAt) {
      var completedAt = res.stat.completedAt;
      return callback(null, {Success :1, CompletedAt : completedAt});
    } else {
      params.stat = {startedAt : Date.now()};
      self.cacheForm(params, function (err){
        self._doPostWufoo(err,params,callback);
      });
    }
  });
};

exports.submitFormBody = function (params, callback) {
  var self = this;
  var form_hash = params.form_hash;
  if (form_hash == null) return callback(null, {"error": "form_hash is required"});
  params.stat = {startedAt : Date.now()};
  self.cacheForm(params, function (err){
    return callback(null, err ? {"error" : err.toString()} : {"Success": 1});
  });
};

exports.validateFormTransmission = function (params, callback) {
  var self = this;
  var form_id = params.form_id ;
  if (form_id  === null) return callback(null, {"error": "form_id  is required"});
  params.stat = {startedAt : Date.now()};
  self.loadForm(form_id, function (err,form){
    if (err) {return callback(null, {"error": "Validate Transmission: no form stored for form_id : '" + form_id +"'" });}
    if(self.formComplete(form)) {
      return callback(null, {"Success": 1});

    } else {
      return callback(null, {"error" : "form transmission failure : incomplete"} );
    }
  });
};
exports.doRemoteFormSubmission = function (params, callback) {
  var self = this;
  var form_id = params.form_id ;
  if (form_id  === null) return callback(null, {"error": "form_id  is required"});
  self.loadForm(form_id, function (err,form){
    if (err || !form) {return callback(null, {"error": !form ? ("Remote Form Submission : no form stored for form_id : '" + form_id +"'")  : err.toString()});}
    var data = form.data;
    var form_hash = form.form_hash;
    return wufoo_api.postFormEntries(form_hash, data, function (err, res) {
      form.stat.completedAt = Date.now();
      form.stat.err = err;
      process.nextTick(function () {
        self.cacheForm(form, function (){});
      });
      return callback(null, err ? {"error": "Remote Form Submission : no form stored for form_id : '" + form_id +"'" } : res);

    });
  });
};

exports.pollRemoteFormSubmissionComplete= function (params, callback) {
  var self = this;
  var form_id = params.form_id ;
  if (form_id  === null) return callback(null, {"error": "form_id  is required"});
  self.loadForm(form_id, function (err,form){
    if (err || !form) {return callback(null, {"error": !form ? ("Poll Form Submission : no form stored for form_id : '" + form_id +"'")  : err.toString()});}
    var stat = form.stat || {completedAt : null};
    return callback(null, {"Success": 1, stat: form.stat});
  });
};
// params = {form_id:form_id, "name":name,"value":value , "size":value.length};
exports.submitChunk= function (params, callback) {
  var self = this;
  var form_id = params.form_id ;
  var name = params.name;
  if (form_id  === null) return callback(null, {"error": "form_id  is required"});
  self.loadForm(form_id, function (err,form){
    if (err || !form) {return callback(null, {"error": !form ? ("Chunk Submission[" + form_id + "][" + name + "] : no form stored ")  : err.toString()});}

    _.each(form.data, function chunkHandler(value,field){
      if (name === field) {
        form.data[name] = params.value;
      }
    });
    self.cacheForm(form, function (err){
      return callback(null, err ? {"error": err.toString()}:{"Success": 1});
    });
  });
};


/*
 * Here we get a list of available Wufoo forms
 */
exports.getForms = function (params, callback) {
  // can't filter forms list endpoint by hash, so get all and filter them by hash here
  var hashes = wufoo_config.wufoo_config.form_hashes || (wufoo_config.wufoo_config.form_hash ? [wufoo_config.wufoo_config.form_hash] : []);
  wufoo_api.getForms(function (err, results) {
    if (err) return callback(null, err);
    // filter out forms we want if certain form hashes are configured
    var forms = results.Forms;
    console.log('hashes:', hashes);
    if (hashes != null && hashes.length > 0) {
      forms = _(forms).filter(function (form) {
        return hashes.indexOf(form.Hash) > -1;
      });
    }
    forms.map(function (form) {
      // minimum amount required
      return getMinFormData(form);
    });

    return callback(null, {
      data: forms,
      config: require('./client_config.js').config
    });
  });
};
var truncate=function(o,len, chars) {
  if(o=== null || o === undefined) {
    return "";
  }
  var str = o;
  if(!_.isString(o)) {
    str = JSON.stringify(o);
  }
  len = len || 25;
  chars = chars || '...';
  var slen = str.length;
  if(slen > len ) {
    str = str.substring(0,Math.min(slen, len ) - chars.length )  + chars;
  }
  return str;
};

if(wufoo_config.wufoo_config.logger) {
  var self = this;
  _.each(exports, function (func,name){
    exports[name] = _.wrap(func, function(func) {
      console.log(name + "(" + truncate(arguments)  +")");
      try {
        return func.apply(self, Array.prototype.slice.call(arguments,1));
      } catch(e) {
        console.log(name + "(" + truncate(arguments)  +") e=" + e);
        throw e;
      }
    });
  });

}
//if (mock_fails) {
//  var meld = require("meld");
//  var self = this;
//  var count = 0;
//  meld.around(this, ['submitFormBody' , 'submitChunk', 'validateFormTransmission','doRemoteFormSubmission','pollRemoteFormSubmissionComplete'], function(methodCall) {
//    console.log("BEFORE " + methodCall.method + "( " + truncate(methodCall.args,150) + ")");
//    count = 0;
//    var timeout = 30000;
//    setTimeout(function(){
//      methodCall.proceed();
//    }, timeout);
//  });
//
//}



// fh.logger endpoints
exports.fh_logger_store = function (params, callback) {
  console.log('fh_logger_store');

  async.waterfall([function (cb) {
    // get next id from counter collection
    $fh.db({
      "act": "list",
      "type": "client_logs_counter"
    }, function (err, data) {
      if (err) return cb(err);

      // check if counter was initialised
      var counter = 1;
      if (data && data.list && data.list.length > 0) {
        var entry = data.list[0];
        counter = entry.fields.counter;

        // update counter
        counter += 1;
        $fh.db({
          "act": "update",
          "type": "client_logs_counter",
          "guid": entry.guid,
          "fields": {
            "counter": counter
          }
        }, function (err, data) {
          if (err) return cb(err);

          return cb(null, counter);
        });
      } else {
        $fh.db({
          "act": "create",
          "type": "client_logs_counter",
          "fields": {
            "counter": counter
          }
        }, function (err, data) {
          if (err) return cb(err);

          return cb(null, counter);
        });
      }
    });
  }, function (counter, cb) {
    $fh.db({
      "act": "create",
      "type": "client_logs",
      "fields": {
        "env": JSON.stringify(params.env),
        "logs": params.logs,
        "timestamp": Date.now(),
        "id": counter
      }
    }, function(err, data) {
      if (err) return cb(err);
      
      console.log('data=', data);
      return cb(null, data);
    });
  }], function (err, data) {
    if (err) return callback(err);

    return callback(null, {
      "status": "ok",
      "id": data.fields.id
    });
  });
};


// fh.db admin endpoints
// http://editor.datatables.net/server/
function dbDataToClientData(data, callback) {
  var res = {
    "id": data.guid,
    "row": data.fields
  };
  return callback(null, res);

}

function dbList(params, callback) {
  $fh.db({
    "act": "list",
    "type": params.entity
  }, function(err, data) {
    if (err) return callback(err);

    var res = {
      aaData: []
    };

    for (var di = 0, dl = data.list.length; di < dl; di += 1) {
      var tempRow = data.list[di].fields;
      tempRow.DT_RowId = data.list[di].guid;
      tempRow.logs_length = tempRow.logs.length;
      tempRow.timestamp = tempRow.timestamp ? new Date(tempRow.timestamp).toUTCString() : new Date(0).toUTCString();
      res.aaData.push(tempRow);
    }

    return callback(null, res);
  });
}

function dbCreate(params, callback) {
  $fh.db({
    "act": "create",
    "type": params.entity,
    "fields": params.data
  }, function(err, data) {
    if (err) return callback(err); // TODO: field errors?

    return dbDataToClientData(data, callback);
  });
}

function dbUpdate(params, callback) {
  $fh.db({
    "act": "update",
    "type": params.entity,
    "guid": params.id,
    "fields": params.data
  }, function(err, data) {
    if (err) return callback(err);

    return dbDataToClientData(data, callback);
  });
}

function dbDelete(params, callback) {
  $fh.db({
    "act": "delete",
    "type": params.entity,
    "guid": params.data[0] // TODO: allow multiple deletes?
  }, function(err, data) {
    if (err) return callback(err);

    return callback(null, {
      "id": -1
    });
  });
}

exports.db = function (params, callback) {
  console.log('params:', params);

  var action = params.action || 'list';

  switch(action)
  {
    case "create": dbCreate(params, callback); break;
    case "edit": dbUpdate(params, callback); break;
    case "remove": dbDelete(params, callback); break;
    default: dbList(params, callback);
  }

};
