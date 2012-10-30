PageModel = Backbone.Model.extend({
  initialize: function () {
    var fields = this.get('Fields');

    // // look at special rules & update fields accordingly before creating field collection
    // _(this.get('Rules') || []).each(function (fRule) {
    //   // TODO: check other types
    //   if ('Hide' === fRule.Type) {
    //     _(fRule.Conditions).each(function (condition) {
    //       var fieldName = "Field" + condition.FieldName;
    //       var fieldToUpdate = _(fields).find(function (field) {
    //         return fieldName === field.ID;
    //       });
    //       if (fieldToUpdate != null) {
    //         fieldToUpdate.specialRules = fieldToUpdate.specialRules || [];
    //         fieldToUpdate.specialRules.push({
    //           "id": fRule.RuleId,
    //           "filter": condition.Filter,
    //           "value": condition.Value,
    //           "match": fRule.MatchType,
    //           "actionType": "wufoo_hide",
    //           "actionField": 'Field' + fRule.Setting.FieldName
    //         });
    //       }
    //     });
    //   }
    // });
    this.fields = new Fields(fields);
  }
});

// pages collection
var Pages = Backbone.Collection.extend({
  model: PageModel
});