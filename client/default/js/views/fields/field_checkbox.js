FieldCheckboxView = FieldView.extend({
  // TODO: allow for multiple checkboxes
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="checkbox">'],

  addRules: function () {
    // don't call super fn as checkboxes either
    // - must be checked if only 1 option
    // - at least one checked if more than one option
    // TODO: implement rule based on # of checkboxes
  }
});