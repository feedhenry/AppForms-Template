FieldFileView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="file">'],


  dumpContent: function() {
    var tmp = "<empty>";
    if(this.fileData) {
      var size = this.fileData.fileBase64.length +" bytes";
      if(this.fileData.fileBase64.length > 1024) {
        size = (Math.floor((this.fileData.fileBase64.length/ 1024) * 1000) / 1000) +" Kilo bytes";
      }
      tmp = {content_type : this.fileData.content_type,filename : this.fileData.filename , size: size }
    }
    $fh.logger.debug("Value changed :: " + JSON.stringify(tmp));
  },

  contentChanged: function(e) {
    var self = this;
    self.fileData = {};
    var changeimg = function(str){
      if(typeof str === "object") {
        str = str.target.result; // file reader
      }
      self.fileData.fileBase64 = str;
      self.dumpContent();
      self.model.set({Value: self.value()});
    };

    var file, fileObj = this.$el.find('input')[0];
    if (fileObj && fileObj.files) { // webkit/ie
      file = fileObj.files[0];
      self.fileData.filename = file.name;
      self.fileData.content_type = file.type;
      var fr = new FileReader();
      fr.onloadend = changeimg;
      fr.readAsDataURL(file);
    } else {
      file = fileObj.value; // firefox
      changeimg(file);
    }
  },

  value: function(value) {
    if (value) {
      //How can you update the file element to show the current file selected
      this.fileData = value[this.model.get('ID')];
    }
    value = {};
    if(this.fileData) {
      value[this.model.get('ID')] = this.fileData;
    }
    return value;
  }
});