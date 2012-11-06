FieldFileView = FieldView.extend({
  events: {
    'change input': 'imageChosen'
  },
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="file">'],

  value: function () {
    return this.fileBase64 || '';
  },

  imageChosen: function () {
    var self = this;

    var changeimg = function(str){
      if(typeof str === "object") {
        str = str.target.result; // file reader
      }
      self.fileBase64 = str;
    };

    var file, fileObj = this.$el.find('input')[0];

    if (fileObj && fileObj.files) { // webkit/ie
      file = fileObj.files[0];
      var fr = new FileReader();
      fr.onloadend = changeimg;
      fr.readAsDataURL(file);
    } else {
      file = fileObj.value; // firefox
      changeimg(file);
    }
  }

});