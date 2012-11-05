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


    // // Build table
    // var table = $(_.template(this.templates.table, {}));
    // // Create header
    // var thead = $('<thead>').append('<tr>');
    // var thead_row = $('tr', thead);
    // // Add headers/choices
    // $.each(choices, function(i, choice) {
    //   if (i === 0) {
    //     // Spacer
    //     thead_row.append('&nbsp;');
    //   }
    //   var th = $('<th>').text(choice.Label);
    //   thead_row.append(th);
    // });
    // table.append(thead);
    // $.each(subfields, function(i, subfield) {
    //   var row = $('<tr>');
    //   $.each(choices, function(j, choice) {
    //     if (j === 0) {
    //       var th = $('<th>').text(subfield.Label);
    //       row.append(th);
    //     }
    //     var td = $(_.template(self.templates.input, {
    //       id: subfield.ID,
    //       iter: j +1,
    //       value: subfield.Label
    //     }));
    //     row.append(td);
    //   });
    //   table.append(row);
    // });
    // this.$el.append(table);
    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  }
});

// For mobile, change to:
// 
// Statement One
// <select>
// Statement Two
// <select>