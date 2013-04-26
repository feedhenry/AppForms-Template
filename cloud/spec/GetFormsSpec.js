var buster = require("buster");
var request = require("request");
var _ = require("underscore");
buster.spec.expose();

var spec = describe("getForms", function () {
  var result;
  beforeAll(function(done) {
    this.timeout = 2000;
    var handleResponse =_.bind(function (error, response, body) {
      result  = this.subject = {error:error, response:response, body:JSON.parse(body)};
    },this);
    request.post('http://127.0.0.1:8001/cloud/getForms', done(handleResponse));
  });
  
  it("should not be an error", function () {
    expect(this.subject.error).toBeNull();
  });
  
  it("should be 200 OK", function () {
    expect(this.subject.response.statusCode == 200).toBeTrue();
  });
  
  it("should be a forms response", function () {
    expect(this.subject.body.data).toBeDefined();
  });
  
  it("should have multiple forms", function () {
    expect(this.subject.body.data).toBeArray();
  });

  describe("1 Geo , 1 Cam , 1 Signature & 1 Map", function (){
    beforeAll(_.bind(function() {
      this.subject = _.find(result.body.data, function(o){ return o.Name === "1 Geo , 1 Cam , 1 Signature & 1 Map"; });
    },this));
    
    it("should contain name", function () {
      expect(this.subject.Name).toBeDefined();
      expect(this.subject.Name).toEqual('1 Geo , 1 Cam , 1 Signature & 1 Map');
    });
    it("should contain Description", function () {
      expect(this.subject.Description).toBeDefined();
      expect(this.subject.Description).toEqual('This form uses WuFoo CSS classes to allow map special functions to form elemements');
    });
    it("should contain RedirectMessage", function () {
      expect(this.subject.RedirectMessage).toBeDefined();
      expect(this.subject.RedirectMessage).toEqual('Great! Thanks for filling out my form!');
    });
    it("should contain Url", function () {
      expect(this.subject.Url).toBeDefined();
      expect(this.subject.Url).toEqual('1-geo-1-cam-1-signature-1-map');
    });
    it("should contain Email", function () {
      expect(this.subject.Email).toBeDefined();
      expect(this.subject.Email).toEqual('');
    });
    it("should contain IsPublic", function () {
      expect(this.subject.IsPublic).toBeDefined();
      expect(this.subject.IsPublic).toEqual('1');
    });
    it("should contain Language", function () {
      expect(this.subject.Language).toBeDefined();
      expect(this.subject.Language).toEqual('english');
    });
    it("should contain StartDate", function () {
      expect(this.subject.StartDate).toBeDefined();
    });
    it("should contain EndDate", function () {
      expect(this.subject.EndDate).toBeDefined();
    });
    it("should contain EntryLimit", function () {
      expect(this.subject.EntryLimit).toBeDefined();
      expect(this.subject.EntryLimit).toEqual('0');
    });
    it("should contain DateCreated", function () {
      expect(this.subject.DateCreated).toBeDefined();
    });
    it("should contain DateUpdated", function () {
      expect(this.subject.DateUpdated).toBeDefined();
    });
    it("should contain Hash", function () {
      expect(this.subject.Hash).toBeDefined();
      expect(this.subject.Hash).toEqual('q7p2s7');
    });
    it("should contain LinkFields", function () {
      expect(this.subject.LinkFields).toBeDefined();
    });
    it("should contain LinkEntries", function () {
      expect(this.subject.LinkEntries).toBeDefined();
    });
    it("should contain LinkEntriesCount", function () {
      expect(this.subject.LinkEntriesCount).toBeDefined();
    });
  });
  
  describe("config", function (){
    beforeAll(function() {
      this.subject = result.body.config;
    });
    
    it("should contain force_cloud_config_updates", function () {
      expect(this.subject.force_cloud_config_updates).toBeDefined();
      expect(this.subject.force_cloud_config_updates).toBeTrue();
    });
    
    it("should contain cam_quality", function () {
      expect(this.subject.cam_quality).toBeDefined();
      expect(this.subject.cam_quality).toEqual(50);
    });
    
    it("should contain cam_targetWidth", function () {
      expect(this.subject.cam_targetWidth).toBeDefined();
      expect(this.subject.cam_targetWidth).toEqual(2048);
    });
    
    it("should contain cam_targetHeight", function () {
      expect(this.subject.cam_targetHeight).toBeDefined();
      expect(this.subject.cam_targetHeight).toEqual(1536);
    });
    
    it("should contain sent_save_max", function () {
      expect(this.subject.sent_save_max).toBeDefined();
      expect(this.subject.sent_save_max).toEqual(5);
    });
    
    it("should contain debug_mode", function () {
      expect(this.subject.debug_mode).toBeDefined();
      expect(this.subject.debug_mode).toBeFalse();
    });
    
    it("should contain logger", function () {
      expect(this.subject.logger).toBeDefined();
      expect(this.subject.logger).toBeFalse();
    });
    
    it("should contain max_retries", function () {
      expect(this.subject.max_retries).toBeDefined();
      expect(this.subject.max_retries).toEqual(0);
    });
    
    it("should contain use_chunking", function () {
      expect(this.subject.use_chunking).toBeDefined();
      expect(this.subject.use_chunking).toBeTrue();
    });
    
    it("should contain timeout", function () {
      expect(this.subject.timeout).toBeDefined();
      expect(this.subject.timeout).toEqual(30);
    });
    
    it("should contain log_line_limit", function () {
      expect(this.subject.log_line_limit).toBeDefined();
      expect(this.subject.log_line_limit).toEqual(300);
    });
    
    it("should contain log_email", function () {
      expect(this.subject.log_email).toBeDefined();
      expect(this.subject.log_email).toEqual("logs.enterpriseplc@feedhenry.com");
    }); 
    
    it("should contain white_list", function () {
      expect(this.subject.white_list).toBeDefined();
      expect(this.subject.white_list).toBeArray();
    });
 });
  

});
