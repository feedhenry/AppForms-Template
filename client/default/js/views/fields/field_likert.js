FieldLikertView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    subfield_container: '<div class="likert_subfield"></div>',
    select: '<label for="<%= id %>" class="font-normal"><%= label %></label><select id="<%= id %>" name="<%= id %>"></select>',
    option: '<option value="<%= value %>"><%= label %></option>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    var choices = this.model.get('Choices');

    $.each(subfields, function(i, subfield) {
      var subfield_container = $(_.template(self.templates.subfield_container, {}));
      var select = $(_.template(self.templates.select, {
        id: subfield.ID,
        label: subfield.Label
      }));

      // Add options
      $.each(choices, function(i, choice) {
        // Default blank
        if (i === 0) {
          var option = $(_.template(self.templates.option, {
            label: '',
            value: ''
          }));
          select.append(option);
        }
        var option = $(_.template(self.templates.option, {
          label: choice.Label,
          value: choice.Score
        }));
        select.append(option);
      });

      // Add select
      subfield_container.append(select);
      self.$el.append(subfield_container);
    });

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  },

  serialize: function() {
    var serialized_field = {};
    this.$el.find('select').each(function() {
      serialized_field[$(this).attr('id')] = $(this).val();
    });
    return serialized_field;
  },
});
