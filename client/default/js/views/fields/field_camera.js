FieldCameraView = FieldView.extend({
  events: {
    'click button.removeThumb': "removeThumb",
    'click button.fhcam': "addFromCamera",
    'click button.fhpics': "addFromLibrary"
  },

  template: ['<label for="<%= id %>"><%= title %></label>',
    '<div class="upload"><p>Please choose a picture</p>',
    '<button class="apibtn fhcam"><img style="min-height:20px;" src="./img/fhcam.png"></button>',
    '<button class="apibtn fhpics"><img style="min-height:20px;" src="./img/fhcam_lib.png"></button></div>',
    '<div class="uploaded"><p>Picture chosen</p>',
    '<input id="<%= id %>" name="<%= id %>" type="hidden">',
    '<img class="imageThumb">',
    '<button class="apibtn removeThumb">Remove Image</button></div>'],

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    this.setImageData(null);

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  },

  setImageData: function (imageData) {
    if (imageData) {
      console.log('setting imageData:', imageData.length);
      this.$el.find('#' + this.model.get('ID')).val(imageData);
      this.$el.find('.imageThumb').attr('src', 'data:image/jpg;base64,' + imageData);
      this.$el.find('.upload').hide();
      this.$el.find('.uploaded').show();
    }
    else {
      this.$el.find('#' + this.model.get('ID')).val(null);
      this.$el.find('.imageThumb').removeAttr('src');
      this.$el.find('.upload').show();
      this.$el.find('.uploaded').hide();
    }
  },

  removeThumb: function (e) {
    e.preventDefault();
    console.log('removeThumb');

    this.setImageData(null);
  },

  addFromCamera: function (e) {
    e.preventDefault();
    this.addImage();
  },

  addFromLibrary: function (e) {
    e.preventDefault();
    this.addImage(true);
  },

  addImage: function (fromLibrary) {
    var camOptions = {
      quality: 50,
      targetWidth: 2048,
      targetHeight: 1536
    };

    if (typeof navigator.camera === 'undefined') {
      this.setImageData(this.sample_image);
    } else {
      if (fromLibrary) {
        camOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }
      navigator.camera.getPicture(this.setImageData, function(err) {
        alert('Camera Error: ' + err);
      }, camOptions);
    }
  },

  sample_image: '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMzgyQjRCMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMzgyQjRDMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQzODJCNDkxNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQzODJCNEExNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAyADIDASIAAhEBAxEB/8QATQABAQAAAAAAAAAAAAAAAAAAAAQBAQEBAAAAAAAAAAAAAAAAAAAEBRABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiASt8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k='

});