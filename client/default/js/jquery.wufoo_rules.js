(function( $ ) {
  var events = {
    "text": 'focusin focusout keyup',
    "other": 'click'
  };

  var typeSelector = {
    "text": ":text, [type='password'], [type='file'], select, textarea, " +
      "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
      "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
      "[type='week'], [type='time'], [type='datetime-local'], " +
      "[type='range'], [type='color']",
    "other": "[type='radio'], [type='checkbox'], select, option"
  };

  var ruleFunctions = {};

  // remove and bind all configured re
  function bindRules(el) {
    el.unbind();

    var elType = 'other';
    if (el.is(typeSelector.text)) {
      elType = 'text';
    }
    var elEvents = events[elType];

    el.bind(elEvents, function () {
      var jqEl = $(this);
      var rules = jqEl.data('wufoo_rules') || {};

      var value = jqEl.is(typeSelector.text) ? jqEl.val() : jqEl.is(':checked');
      for (var type in rules) {
        var ruleFn = ruleFunctions[type];
        ruleFn(value, jqEl, rules[type]);
      }
    });
  }

  $.extend($.fn, {

    wufoo_rules : function (command, argument) {
      var element = this[0];
      if (command) {
        var rules = $.data(element, 'wufoo_rules') || {};
        switch(command) {
        case "add":
          for (var type in argument) {
            rules[type] = argument[type];
          }
          $.data(element, 'wufoo_rules', rules);
          bindRules(this);
          break;
        case "remove":
          if (!argument) {
            $.data(element, 'wufoo_rules', null);
            bindRules(this, null);
            return rules;
          }
          var filtered = {};
          $.each(argument.split(/\s/), function(index, type) {
            filtered[type] = rules[type];
            delete rules[type];
          });
          $.data(element, 'wufoo_rules', rules);
          bindRules(this);
          return filtered;
        }
      }
    }
  });

  $.wufoo_rule_add = function (type, fn) {
    ruleFunctions[type] = fn;
  };
})( jQuery );