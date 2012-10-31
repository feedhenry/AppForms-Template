(function () {
  function showhide(value, element, params, show) {
    var fieldId = 'Field' + params.Setting.FieldName;
    var fieldValue = params.condition.Value;
    if (params.Setting.FieldTypes[params.condition.FieldName] === 'checkbox') {
      fieldValue = ('is' === params.condition.Filter);
    }
    if ((value === fieldValue && !show) || (value !== fieldValue && show)) {
      App.views.form.hideField(fieldId);
    } else {
      App.views.form.showField(fieldId);
    }
  }

  $.wufoo_rule_add('Hide', function (value, element, params) {
    showhide(value, element, params, false);
  });
  $.wufoo_rule_add('Show', function (value, element, params) {
    showhide(value, element, params, true);
  });
})();