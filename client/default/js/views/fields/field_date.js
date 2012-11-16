FieldDateView = FieldView.extend({
  template:['<label for="<%= id %>"><%= title %></label>', '<input id="<%= id %>" name="<%= id %>" type="date">'],

  // TODO: do we need validation? how is this inputted by user?


  defaultValue: function() {
    var defaultValue = {};
    if(this.model.get('DefaultVal')) {
      var val = new moment(this.model.get('DefaultVal'), 'MM/DD/YYYY');
      defaultValue[this.model.get('ID')] = val.format('YYYYMMDD');
    }
    return defaultValue;
  },

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        if (val && !_.isEmpty(val)) {
          $("#" + id).val(new moment(val, "YYYYMMDD").format('YYYY-MM-DD'));
        }
      });
    }
    var val = $('#' + this.model.get('ID')).val();
    value = {};
    if(val !== "") {
      value[this.model.get('ID')] = new moment(val).format('YYYYMMDD');
    }
    return value;
  }
});