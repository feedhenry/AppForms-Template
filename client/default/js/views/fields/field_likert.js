$.validator.addMethod('likert_group_required', function (value, element, params) {
  return $(element).closest('.field_container').find('select option:selected:empty').length < 1;
}, 'Please select an option for all questions.');

FieldLikertView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    subfield_container: '<div class="likert_subfield"></div>',
    select: '<label for="<%= id %>" class="font-normal"><%= label %></label><select id="<%= id %>" name="<%= id %>" class="<%= classes %>"></select>',
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
        label: subfield.Label,
        classes: i > 0 ? 'validate_ignore': ''
      }));

      // Add options
      $.each(choices, function(i, choice) {
        var option;
        // Default blank
        if (i === 0) {
          option = $(_.template(self.templates.option, {
            label: '',
            value: ''
          }));
          select.append(option);
        }
        option = $(_.template(self.templates.option, {
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

  addValidationRules: function () {
    if (this.isRequired()) {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "likert_group_required": true
      });
    }
  }

});
