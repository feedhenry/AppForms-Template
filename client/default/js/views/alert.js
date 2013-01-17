AlertView = Backbone.View.extend({
  options:{el: $("#fh_wufoo_alerts_area")},

  templates: {
    alert: '<div class="fh_wufoo_alert <%= type %>"><%= message %></div>',
    bar: '<div class="fh_wufoo_alert <%= type %>"><span class="small"><%= message %></span><progress max="100" value="<%= value %>"><strong><%= message %></strong></progress></div>',
    ios_bar: '<div class="fh_wufoo_alert <%= type %>"><span class="small"><%= message %></span><div class="progress_bar_container" ><div class="progress_bar complete" style="width:<%=value%>%%"></div></div></div>'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var self=this;
    var template = this.templates.alert;
    var value;
    var type = this.options.type;
    var o = this.options.o;
    var message = o.text || '';
    if(null != o.current ) {
      value  = Math.floor((o.current * 100)/ o.total);
      template = Utils.isIOS() ? this.templates.ios_bar : this.templates.bar;
    }

    this.$el.html(_.template(template, {message:message,value:value,type:type}));
    this.$el.show();
    setTimeout(function() {
      self.$el.slideUp(function() {
        $(self.$el).empty();
      });
    }, this.options.timeout || 10000);
    return this;
  }
});

AlertView.showAlert = function(o, type, timeout) {
  new AlertView({o:o, type:type, timeout:timeout});
};