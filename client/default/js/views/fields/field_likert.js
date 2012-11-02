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

// <table cellspacing="0">
//   <thead>
//     <tr>
//       <th>&nbsp;</th>
//       <td>Strongly Disagree</td>
//       <td>Disagree</td>
//       <td>Agree</td>
//       <td>Strongly Agree</td>
//     </tr>
//   </thead>
//   <tbody>
//     <tr class="statement125">
//       <th>
//         <label for="Field125">Statement One</label>
//       </th>
//       <td title="Strongly Disagree">
//         <input id="Field125_1" name="Field125" type="radio" tabindex="24" value="Strongly Disagree" onchange="handleInput(this);">
//         <label for="Field125_1">1</label>
//       </td>
//       <td title="Disagree">
//         <input id="Field125_2" name="Field125" type="radio" tabindex="25" value="Disagree" onchange="handleInput(this);">
//         <label for="Field125_2">2</label>
//       </td>
//       <td title="Agree">
//         <input id="Field125_3" name="Field125" type="radio" tabindex="26" value="Agree" onchange="handleInput(this);">
//         <label for="Field125_3">3</label>
//       </td>
//       <td title="Strongly Agree">
//         <input id="Field125_4" name="Field125" type="radio" tabindex="27" value="Strongly Agree" onchange="handleInput(this);">
//         <label for="Field125_4">4</label>
//       </td>
//     </tr>
//     <tr class="alt statement126">
//       <th>
//         <label for="Field126">Statement Two</label>
//       </th>
//       <td title="Strongly Disagree">
//         <input id="Field126_1" name="Field126" type="radio" tabindex="28" value="Strongly Disagree" onchange="handleInput(this);">
//         <label for="Field126_1">1</label>
//       </td>
//       <td title="Disagree">
//         <input id="Field126_2" name="Field126" type="radio" tabindex="29" value="Disagree" onchange="handleInput(this);">
//         <label for="Field126_2">2</label>
//       </td>
//       <td title="Agree">
//         <input id="Field126_3" name="Field126" type="radio" tabindex="30" value="Agree" onchange="handleInput(this);">
//         <label for="Field126_3">3</label>
//       </td>
//       <td title="Strongly Agree">
//         <input id="Field126_4" name="Field126" type="radio" tabindex="31" value="Strongly Agree" onchange="handleInput(this);">
//         <label for="Field126_4">4</label>
//       </td>
//     </tr>
//     <tr class="statement127">
//       <th>
//         <label for="Field127">Statement Three</label>
//       </th>
//       <td title="Strongly Disagree">
//         <input id="Field127_1" name="Field127" type="radio" tabindex="32" value="Strongly Disagree" onchange="handleInput(this);">
//         <label for="Field127_1">1</label>
//       </td>
//       <td title="Disagree">
//         <input id="Field127_2" name="Field127" type="radio" tabindex="33" value="Disagree" onchange="handleInput(this);">
//         <label for="Field127_2">2</label>
//       </td>
//       <td title="Agree">
//         <input id="Field127_3" name="Field127" type="radio" tabindex="34" value="Agree" onchange="handleInput(this);">
//         <label for="Field127_3">3</label>
//       </td>
//       <td title="Strongly Agree">
//         <input id="Field127_4" name="Field127" type="radio" tabindex="35" value="Strongly Agree" onchange="handleInput(this);">
//         <label for="Field127_4">4</label>
//       </td>
//     </tr>
//   </tbody>
// </table>