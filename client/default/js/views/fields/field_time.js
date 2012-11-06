FieldTimeView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" value="<%= value %>" type="time">']

//  'Field117' => '08:30:31',
// TODO: do we need validation? how is this inputted by user?

});