;(function($){
  var SigField = function(selector, options){
    var ctx = $(selector);
    var self = this;
    var settings = $.extend({}, $.fn.sigField.defaults, options);
    var extension = 'png';
    var sigPad = null;

    function init(){
      var sigButton = $('.cap_sig_btn', ctx);
      if(0 == sigButton.length){
        var originInput = ctx.find('div').find('input');
        var sigValue = $('<input>', {
          "class": 'sigValue',
          type: 'hidden',
          name: originInput.attr('name')
        });
        var sigField = jQuery('<div>', {
          "class": 'sigField'
        });
        var sigImg = jQuery('<img>', {
          "class": 'sigImage',
          width: settings.imageWidth,
          height: settings.imageHeight
        });
        sigButton = jQuery('<button>', {
          "class": 'cap_sig_btn',
          text: settings.captureText
        });
        sigField.append(sigImg).append(sigButton);
        ctx.find('div').remove();
        ctx.append(sigValue).append(sigField);
      } else {
        sigButton.text(settings.captureText);
        ctx.find('.sigImage').attr('width', settings.imageWidth).attr('height', settings.imageHeight);
      }
      sigButton.unbind('click').bind('click', function(e){
        captureSignature(e);
      })
    }

    function captureSignature(e){
      e.preventDefault();
      if (ctx.data('sigpadInited')) {
        $('.sigPad', ctx).show();
      } else {
        var template = ['<form class="sigPad">'];
        template.push('<ul class="sigNav">');
        template.push('<li class="clearButton"><a href="#clear">Clear</a></li>');
        template.push('</ul>');
        template.push('<div class="sig sigWrapper">');
        template.push('<canvas class="pad" width="'+settings.canvasWidth+'" height="'+settings.canvasHeight+'"></canvas>');
        template.push('<input type="hidden" name="output" class="output">');
        template.push('</div>');
        template.push('<button class="cap_sig_done_btn" type="button">Done</button>');
        template.push('</form>');

        var sigField = $(template.join(""));
        $('.sigField', ctx).append(sigField);
        sigPad = $('.sigPad', ctx).signaturePad({
          drawOnly: true,
          lineTop: settings.canvasLineTop
        });
        ctx.data('sigpadInited', true);
        $('.cap_sig_done_btn', ctx).unbind('click').bind('click', function(e) {
          var sigData = sigPad.getSignatureImage();
          if(sigData == "data:,"){ 
            sigData = toBitmapURL($('.sigPad', ctx).find('canvas')[0]);
            extension = "bmp";
          }
          var img = $('.sigImage', ctx)[0];
          img.src = sigData;
          $('.sigValue', ctx).val(sigData);
          $('.sigPad', ctx).hide();
        })
      }
    }

    function getName(){
      return $('.sigValue', ctx).attr('name');
    }

    function toJSON(){
      return {
        name: getName(),
        value: $('.sigValue', ctx).val().split(",")[1],
        'type': 'file',
        'extension' : extension,
        'filename': 'signature'
      }
    }

    $.extend(self, {
      init: function(){
        init();
      },
      getName: function(){
        return getName();
      },
      toJSON: function(){
        return toJSON();
      }
    })
  }

  $.fn.sigField = function(options){
    var field = null;
    this.each(function(){
      api = new SigField(this, options);
      api.init();
    })
    return api;
  }

  $.fn.sigField.defaults = {
    imageWidth: 150,
    imageHeight: 40,
    canvasWidth: 248,
    canvasHeight: 100,
    canvasLineTop: 80,
    captureText: 'Capture'
  }
})(jQuery);