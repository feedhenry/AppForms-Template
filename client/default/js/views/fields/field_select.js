FieldSelectView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<select id="<%= id %>" name="<%= id %>"><option>Test</option></select>']
});