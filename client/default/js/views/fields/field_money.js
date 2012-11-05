// TODO: Wufoo forms page splits this up into subfields, but the API doesn't seem to. Investigate whether we can just post a single field.

FieldMoneyView = FieldNumberView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">']
});