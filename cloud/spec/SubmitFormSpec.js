var buster = require("buster");
var request = require("request");
var async = require("async");
var _ = require("underscore");
var form = require("./SubmitFormHelper.js");
var async = require("async");
buster.spec.expose();

var spec = describe("SubmitForm", function () {
  describe("single", function (){
    beforeAll(function(done) {
      this.timeout = 5000;
      form.submitForm(_.bind(function handleResponses(error,response){
        this.subject = response;
        done();
      },this));
    });
    
    it("should not be an error", function () {
      expect(this.subject.error).toBeNull();
    });
    
    it("should have multiple results ", function () {
      expect(this.subject.responses).toBeArray();
      expect(this.subject.responses.length > 0 ).toBeTrue();
    });
    
    it("should all be OK ", function () {    
      var all = _.all(this.subject.responses, function(r){return r.response.statusCode == 200;});
      expect(all).toBeTrue();
    });
  });

  describe("multiple", function (){
    this.iters = 100;
    beforeAll(function(done) {
      this.timeout = 50000;
      var submitForm = function(n,callback){
        buster.log("form.submitForm[" , n , "] started");
        form.submitForm(function(err,result) {
          buster.log("form.submitForm[" , n , "] complete");
          callback(err,result);
        });
      };
      var handleResponses = _.bind(function(err,results){
        this.subject = {error:err, responses:results};
        done();
      },this);

      async.times(this.iters, submitForm,handleResponses);
    });
    
    it("should not be an error", function () {
      expect(this.subject.error).toBeNull();
    });
    
    it("should only contain 200 responses", function () {
      expect(this.subject.responses.length == this.iters).toBeTrue();
      var all = _.all(this.subject.responses, function(r){
        return _.all(r.responses, function(r){return r.response.statusCode == 200;});
      });
      expect(all).toBeTrue();
    });
  });

});
