SentListView = Backbone.View.extend({
  el: $('#fh_wufoo_sent'),

  events: {
    'click button.dismiss-all': 'dismissAll',
    "change #sentSaveMax": "saveMaxSelected"
  },

  templates: {
    sent_list: '<ul class="fh_appform_field_area list inset sent_list"></ul>',
    sent_header: '<li class="list-divider fh_appform_field_title">Sent Submissions</li>',
    dismiss_all: '<li><button class="fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button></li>',
    save_max: '<li><label for="sentSaveMax" class="fh_appform_field_title">Number of sent items to keep</label><select class="fh_appform_field_input" id="sentSaveMax"><%= options%></select></li>',
    save_max_option: '<option value="<%= value%>"><%= value%></option>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSentForm', 'changed');

    App.collections.sent.bind('add remove reset', this.changed, this);

    this.render();
  },

  saveMaxSelected: function() {
    var saveMax = parseInt($('#sentSaveMax', this.el).val(), 10);
    if (_.isNumber(saveMax)) {
      if(saveMax < $fh.forms.config.get("sent_save_max") && saveMax > $fh.forms.config.get("sent_save_min")){
        $fh.forms.config.set("max_sent_saved", saveMax);
        $fh.forms.config.saveConfig();
      }
    }
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_sent');
    this.populate();
    $(this.el).show();
  },

  populate: function() {
    // Re-render save
    var maxSize = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
    $('#sentSaveMax', this.el).val(maxSize);
  },

  hide: function() {
    $(this.el).hide();
  },

  dismissAll: function(e) {
    e.stopPropagation();

    var confirmDismiss = confirm("Are you sure you want to dismiss all submissions?");
    if (confirmDismiss) {
      var all = [];

      _(App.collections.sent.models).forEach(function(model) {
        all.push(model);
      });

      _(all).forEach(function(model) {
        model.destroy();
      });
    }

    return false;
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.sent_list);
    $('.sent_list', this.el).append(this.templates.sent_header);

    _(App.collections.sent.models).each(function(form) {
      self.appendSentForm(form);
    }, this);

    var interval = $fh.forms.config.get("sent_save_max") - $fh.forms.config.get("sent_save_min");

    var currentVal = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
    var steps = 10;
    var stepSize = Math.floor(interval / steps);
    var optionsString = "";

    //max and min are the same.
    if(interval > 0){

      optionsString += _.template(this.templates.save_max_option, {"value": $fh.forms.config.get("sent_save_min")});

      for(var step = 2; step <= steps; step++){
        var currentStep = (step * stepSize) + $fh.forms.config.get("sent_save_min");
        var nextStep = (step + 1) * stepSize;

        if(currentVal > currentStep && currentVal < nextStep){
          optionsString += _.template(this.templates.save_max_option, {"value": currentStep});
          optionsString += _.template(this.templates.save_max_option, {"value": currentVal});
        } else {
          optionsString += _.template(this.templates.save_max_option, {"value": currentStep});
        }
      }
    } else {
      optionsString += _.template(this.templates.save_max_option, {"value": $fh.forms.config.get("sent_save_max")});
    }

    $('.sent_list', this.el).append(this.templates.dismiss_all);
    $('.sent_list', this.el).append(_.template(this.templates.save_max, {"options": optionsString}));

    this.populate();
  },

  appendSentForm: function(form) {
    var view = new PendingSubmittedItemView({
      model: form
    });
    $('.sent_list', this.el).append(view.render().el);
  }
});