FieldCameraView = FieldView.extend({
  events: {
    'click button.removeThumb': "removeThumb",
    'click button.fhcam': "addFromCamera",
    'click button.fhpics': "addFromLibrary"
  },

  template: ['<label for="<%= id %>"><%= title %></label>',
    '<input id="<%= id %>" name="<%= id %>" type="hidden">',
    '<div class="upload"><p>Please choose a picture</p>',
    '<button class="apibtn fhcam"><img style="min-height:20px;" src="./img/fhcam.png"></button>',
    '<button class="apibtn fhpics"><img style="min-height:20px;" src="./img/fhcam_lib.png"></button></div>',
    '<div class="uploaded"><p>Picture chosen</p>',
    '<img class="imageThumb" height="42" width="42">',
    '<button class="apibtn removeThumb">Remove Image</button></div>'],

  initialize: function() {
    //Make sure 'this' is bound for setImageData, was incorrect on device!
    _.bindAll(this, 'setImageData');
    this.render();
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    this.setImageData(null, true);

    // add to dom hidden
    this.$el.hide();
    this.options.parentEl.append(this.$el);

    this.show();
  },

  getOrder: function () {
    return this.options.order;
  },

  setImageData: function (imageData, dontCallContentChanged) {
    if (imageData) {
      console.log('setting imageData:', imageData.length);
      // prepend dataUri if not already there
      var dataUri = imageData;
      if (!/\bdata\:image\/.+?\;base64,/.test(dataUri)) {
        dataUri = 'data:image/jpeg;base64,' + imageData;
      }
      this.$el.find('#' + this.model.get('ID')).val(dataUri);
      this.$el.find('.imageThumb').attr('src', dataUri);
      this.$el.find('.upload').hide();
      this.$el.find('.uploaded').show();
      this.fileData = {};
      this.fileData.fileBase64 = dataUri;
      this.fileData.filename = "photo.jpg";
      this.fileData.content_type = "image/jpeg";
    } else {
      this.$el.find('#' + this.model.get('ID')).val(null);
      this.$el.find('.imageThumb').removeAttr('src');
      this.$el.find('.upload').show();
      this.$el.find('.uploaded').hide();
      delete this.fileData;
    }
    // manually call contentChanged as 'change' event doesn't get triggered when we manipulate fields programatically
    if (!dontCallContentChanged) {
      this.contentChanged();
    }
  },

  hasImageData: function () {
    return this.$el.find('#' + this.model.get('ID')).val().length > 0;
  },

  getImageData: function () {
    return this.$el.find('#' + this.model.get('ID')).val();
  },

  removeThumb: function (e) {
    e.preventDefault();
    console.log('removeThumb');

    this.setImageData(null);
    this.trigger('imageRemoved'); // trigger events used by grouped camera fields NOTE: don't move to setImageData fn, could result in infinite event callback triggering as group camera field may call into setImageData()
  },

  addFromCamera: function (e) {
    e.preventDefault();
    this.addImage();
    this.trigger('imageAdded'); // trigger events used by grouped camera fields
  },

  addFromLibrary: function (e) {
    e.preventDefault();
    this.addImage(true);
    this.trigger('imageAdded'); // trigger events used by grouped camera fields
  },

  addImage: function (fromLibrary) {
    var camOptions = {
      quality: App.config.cam_quality,
      targetWidth: App.config.cam_targetWidth,
      targetHeight: App.config.cam_targetHeight
    };

    if (typeof navigator.camera === 'undefined') {
      this.setImageData(this.sampleImage());
    } else {
      if (fromLibrary) {
        camOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }
      navigator.camera.getPicture(this.setImageData, function(err) {
        alert('Camera Error: ' + err);
      }, camOptions);
    }
  },

  show: function () {
    // only perform check once
    if (this.options.initHidden) {
      this.options.initHidden = false;
    } else {
      FieldView.prototype.show.call(this);
    }
  },

  value: function(value) {
    if (value && !_.isEmpty(value) && value[this.model.get('ID')] && value[this.model.get('ID')].fileBase64) {
      this.setImageData(value[this.model.get('ID')].fileBase64.replace(/^data:([^,]*,|)/, ""), true);
    }
    value = {};
    if(this.fileData) {
      value[this.model.get('ID')] = this.fileData;
    }
    return value;
  },

  sampleImages: ['/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMzgyQjRCMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMzgyQjRDMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQzODJCNDkxNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQzODJCNEExNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAyADIDASIAAhEBAxEB/8QATQABAQAAAAAAAAAAAAAAAAAAAAQBAQEBAAAAAAAAAAAAAAAAAAAEBRABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiASt8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=',
    'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAALklEQVQYV2NkwAT/oUKMyFIoHKAETBFIDU6FIEUgSaJMBJk0MhQihx2W8IcIAQBhewsKNsLKIgAAAABJRU5ErkJggg==',
    'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAYUlEQVQYV2NkQAJlM1X/g7hd6bdBFCOyHCNIEigBppElkNkgeYIKYBrwKoQ6A+wEuDtwOQHmLLgbQbqQ3YnubhSfwRTj9DUu3+J0I7oGkPVwXwMZKOEHdCdcPdQJILczAAACnDmkK8T25gAAAABJRU5ErkJggg=='],

  sampleImage: function () {
    window.sampleImageNum = (window.sampleImageNum+=1) % this.sampleImages.length;
    return this.sampleImages[window.sampleImageNum];
  }

});
window.sampleImageNum = -1;