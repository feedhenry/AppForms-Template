AboutView = Backbone.View.extend({
  el: $('#fh_wufoo_banner'),

  initialize: function(props) {
    this.$el.find("ul li.device").html("<span>Device</span>:<span>" + props.uuid + "</span>");
  }
});