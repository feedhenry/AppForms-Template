SettingsView = Backbone.View.extend({
  el: $('#fh_wufoo_settings'),

  events: {
    "toggle .toggle": "settingChanged",
    "click a.button-positive": "save",
    "click a.button-negative": "cancel"
  },

  templates: {
    "form": '<form><div class="input-group"></div></form>',
//    "list": '<ul class="list"><form><div class="input-group"></div></form></ul>',
//    "toggle": '<li><label><%= list_item %><div class="toggle <%= toggle_class %>"><div class="toggle-handle"></div></div></li>',
    "toggle": '<div class="input-row"><label><%= list_item %></label><div class="toggle <%= toggle_class %>" data-key="<%= key %>"><div class="toggle-handle"></div></div></div>',
    "input": '<div class="input-row"><label><%= list_item %></label><input type="<%= type %>" value="<%= value %>" data-key="<%= key %>"></div>',
    "other": '<div class="input-row"><label><%= list_item %></label><input readonly type="text" value="<%= value %>"></div>',
    "footer": '<a class="button-negative">Cancel</a><a class="button-positive">Save & Apply</a>'
  },

  initialize: function() {

  },

  render: function () {
    var purtyKey = function (key) {
      // replace '_' with ' ' and capitalise each word
      return _.map(key.split('_'), function (part) {
        return part.charAt(0).toUpperCase() + part.substring(1).toLowerCase();
      }).join(' ');
    };

    this.$el.empty();

    this.$el.append(this.templates.form);

    var div = this.$el.find('.input-group');

    var config = App.config.attributes;
    for (var key in config) {
      // make sure key isn't special e.g. storing defaults for all fields, flag for nuking client modified config vals
      if (config.hasOwnProperty(key) && '__defaults' !== key && 'force_cloud_config_updates' !== key) {
        var val = config[key];
        var el;
        if ('boolean' === typeof val) {
          // special toggle field
          el = _.template(this.templates.toggle, {
            "list_item": purtyKey(key),
            "key": key,
            "toggle_class": val ? "active": ""
          });
        } else if ('number' === typeof val || 'string' === typeof val) {
          // plain input field
          el = _.template(this.templates.input, {
            "list_item": purtyKey(key),
            "key": key,
            "value": val,
            "type": 'number' === typeof val ? 'number' : 'text'
          });
        } else {
          // readonly field showing stringifed value
          el = _.template(this.templates.other, {
            "list_item": purtyKey(key),
            "value": JSON.stringify(val)
          });
        }
        div.append(el);
      }
    }

    div.append(this.templates.footer);
  },

  settingChanged: function () {
    // won't be doing anything with settings unless save is pressed
  },

  save: function () {
    var config = {};

    // get settings values from form, building up config object
    this.$el.find('input:not([readonly])').each(function () {
      var jqEl = $(this);
      var key = jqEl.data('key');
      var val = jqEl.val();
      if (jqEl.is('[type=number]')) {
        val = parseInt(val, 10);
      }
      config[key] = val;
    });

    this.$el.find('.toggle').each(function () {
      var jqEl = $(this);
      var key = jqEl.data('key');
      var val = jqEl.hasClass('active');
      config[key] = val;
    });

    // update config
    App.config.set(_.extend({}, App.config.attributes, config));

    // back to home screen
    App.views.header.showHome();
  },

  cancel: function () {
    App.views.header.showHome();
  },

  show: function() {
    App.views.header.hideAll();
    this.render();
    this.$el.show();
  },

  hide: function() {
    this.$el.hide();
  }
});