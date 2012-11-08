FieldShortnameView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    input: '<span class="fancy_name"><input id="<%= id %>" name="<%= id %>" type="text" class="field text"/><label for="<%= id %>"><%= label %></label></span>'
  },

  render: function() {
    var self = this;

    this.$el.addClass('shortname');
    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.input, {
        "id": subfield.ID,
        "label": subfield.Label,
        "value": subfield.DefaultVal
      }));

      self.$el.append(choice_field);
    });

    var br = $('<br>').css('clear', 'left');
    self.$el.append(br);

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addValidationRules: function () {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('input').each(function () {
        $(this).rules('add', {
          "required": true
        });
      });
    }
  }
});
