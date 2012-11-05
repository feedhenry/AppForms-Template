FieldLikertView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    table: '<table cellspacing="0" class="likert"></table>',
    input: '<td><input id="<%= id %>_<%= iter %>" name="<%= id %>" type="radio" value="Strongly Disagree"><label for="<%= id %>_<%= iter %>"><%= iter %></label></td>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    var choices = this.model.get('Choices');

    // Build table
    var table = $(_.template(this.templates.table, {}));

    // Create header
    var thead = $('<thead>').append('<tr>');
    var thead_row = $('tr', thead);

    // Add headers/choices
    $.each(choices, function(i, choice) {
      if (i === 0) {
        // Spacer
        thead_row.append('&nbsp;');
      }
      var th = $('<th>').text(choice.Label);
      thead_row.append(th);
    });

    table.append(thead);

    $.each(subfields, function(i, subfield) {
      var row = $('<tr>');

      $.each(choices, function(j, choice) {
        if (j === 0) {
          var th = $('<th>').text(subfield.Label);
          row.append(th);
        }

        var td = $(_.template(self.templates.input, {
          id: subfield.ID,
          iter: j +1,
          value: subfield.Label
        }));

        row.append(td);
      });

      table.append(row);
    });

    this.$el.append(table);

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  }
});
