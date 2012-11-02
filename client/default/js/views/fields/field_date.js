FieldDateView = FieldView.extend({
  template:['<label for="<%= id %>"><%= title %></label>', '<input id="<%= id %>" name="<%= id %>" value="<%= value %>" type="date">'],

  serialize: function () {
    var value = $('#' + this.model.get('ID')).val();
    var serialized_field = {};
    if(value !== "") {
      serialized_field[this.model.get('ID')] = new moment(value).format('YYYYMMDD');
    }
    return serialized_field;
  }
});