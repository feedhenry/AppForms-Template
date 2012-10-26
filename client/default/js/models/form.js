FormModel = Backbone.Model.extend({
  initialize: function () {
    var fields = this.get('Fields');

    // look at special rules & update fields accordingly before creating field collection
    _(this.get('Rules').FieldRules || []).each(function (fRule) {
      // TODO: check other types
      if ('Hide' === fRule.Type) {
        _(fRule.Conditions).each(function (condition) {
          var fieldName = "Field" + condition.FieldName;
          var fieldToUpdate = _(fields).find(function (field) {
            return fieldName === field.ID;
          });
          if (fieldToUpdate != null) {
            fieldToUpdate.specialRules = fieldToUpdate.specialRules || [];
            fieldToUpdate.specialRules.push({
              "id": fRule.RuleId,
              "filter": condition.Filter,
              "value": condition.Value,
              "match": fRule.MatchType,
              "actionType": "hide",
              "actionField": 'Field' + fRule.Setting.FieldName
            });
          }
        });
      }
    });
        /*"RuleId": "61",
        "Type": "Hide",
        "Setting": {
          "FieldName": "5",
          "FieldTypes": {
            "3": "number"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [
          {
            "ConditionId": "61",
            "FieldName": "3",
            "Filter": "is equal to",
            "Value": "7",
            "ReportId": "57",
            "RuleId": "61"
          }
        ]*/

    // initialise collection
    this.fields = new Fields(fields);
  }
});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  fhStorage: new Store("forms")
});

// Initialize with mock
var form = new FormModel(App.MockForm);
App.collections.forms = new FormsCollection();
// App.collections.forms.create(form);
// App.collections.forms.create(form);

// Kick things off by fetching
App.collections.forms.fetch();