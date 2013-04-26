var buster = require("buster");
var request = require("request");
var _ = require("underscore");
buster.spec.expose();

var spec = describe("getForm", function () {
  describe("error", function () {

    beforeAll(function(done) {
      var self = this;
      var handleResponse = _.bind(function (error, response, body) {
        this.subject = {error:error, response:response, body:body};
      },this);
      request.post('http://127.0.0.1:8001/cloud/getForm', done(handleResponse));
    });
    
    it("should not be an error", function () {
      expect(this.subject.error).toBeNull();
    });
    
    it("should be 200 OK", function () {
      expect(this.subject.response.statusCode == 200).toBeTrue();
    });
    
    it("should be an error response", function () {
      expect(JSON.parse(this.subject.body).error).toBeDefined();
    });
    
    it("should be an 'form_hash is required' error response", function () {
      expect(JSON.parse(this.subject.body).error == 'form_hash is required').toBeTrue();
    });
  });

  describe("success", function () {

    beforeAll(function(done) {
      this.timeout = 2000;
      var params = {"id":"s7w7z7",
                    "version":"2013-03-05 16:17:08",
                    "__fh":{
                      "cuid":"26B5D3CA5182453587DF60BEA924CCB3",
                      "appid":"edS0z9KPxo_zNyZiGpbCCDMy",
                      "appkey":"d4c4e1298fa56f7389b132ea39af3a9c8004e564",
                      "destination":"studio",
                      "app_version":"7",
                      "sdk_version":"FH_HYBRID_SDK/1.0.5"
                    }
                   };
      var handleResponse= _.bind(function (error, response, body) {
        this.subject = {error:error, response:response, body:JSON.parse(body)};
      },this);
      request.post({url :'http://127.0.0.1:8001/cloud/getForm', form:params, timeout : 5000}, done(handleResponse));
    });
    
    it("should not be an error", function () {
      expect(this.subject.error).toBeNull();
    });
    
    it("should be 200 OK", function () {
      expect(this.subject.response.statusCode == 200).toBeTrue();
    });
    
    it("should not be an error response", function () {
      expect(this.subject.error).toBeNull();
    });
    
    it("should have a name", function () {
      expect(this.subject.body.Name).toBeDefined();
    });
    
    it("should have the correct name", function () {
      expect(this.subject.body.Name == "WuFoo Phase II").toBeTrue();
    });
    
    it("should have a Hash", function () {
      expect(this.subject.body.Hash).toBeDefined();
    });
    
    it("should have the correct Hash", function () {
      expect(this.subject.body.Hash == "s7w7z7").toBeTrue();
    });
    
    it("should have a DateUpdated", function () {
      expect(this.subject.body.DateUpdated).toBeDefined();
    });
    
  });

});
