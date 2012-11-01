FieldSelectView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<select id="<%= id %>" name="<%= id %>"><option>Test</option></select>'],

  templates: {
    label: '<label><%= title %></label>',
    select: '<select id="<%= id %>" name="<%= id %>"></select>',
    option: '<option value="<%= value %>"><%= value %></option>'
  },

  render: function() {
    var self = this;

    var label = _.template(this.templates.label, {
      "title": this.model.get('Title')
    });
    this.$el.append(label);

    var select = _.template(this.templates.select, {
      "id": this.model.get('ID')
    });
    this.$el.append(select);

    var choices = this.model.get('Choices');    

    $.each(choices, function(i, choice) {
      var option = $(_.template(self.templates.option, {
        "value": choice.Label
      }));
      $('select', self.el).append(option);
    });

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  },
  
});