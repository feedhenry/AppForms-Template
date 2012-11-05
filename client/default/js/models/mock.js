var App = App || {};

App.MockForm = {
  "Name": "WuFoo Phase II",
  "Description": "This is the sample form being used for development of WuFoo Phase II. It contains all standard fields and has multiple pages and rules.",
  "RedirectMessage": "Great! Thanks for filling out my form!",
  "Url": "wufoo-phase-ii",
  "Email": "",
  "IsPublic": "1",
  "Language": "english",
  "StartDate": "2000-01-01 12:00:00",
  "EndDate": "2030-01-01 12:00:00",
  "EntryLimit": "0",
  "DateCreated": "2012-10-23 10:58:40",
  "DateUpdated": "2012-10-30 07:58:30",
  "Hash": "s7w7z7",
  "LinkFields": "https://feedhenry.wufoo.eu/api/v3/forms/s7w7z7/fields.json",
  "LinkEntries": "https://feedhenry.wufoo.eu/api/v3/forms/s7w7z7/entries.json",
  "LinkEntriesCount": "https://feedhenry.wufoo.eu/api/v3/forms/s7w7z7/entries/count.json",
  "Pages": [{
    "Title": "Standard Fields",
    "Fields": [{
      "Title": "Single Text Field - No Rules",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field1"
    }, {
      "Title": "Single Text Field - Required",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field238"
    }, {
      "Title": "Single Text Field - Predefined value",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "predefined value",
      "Page": "1",
      "Type": "text",
      "ID": "Field237"
    }, {
      "Title": "Single Text Field - Range 1 - 4 characters",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field240"
    }, {
      "Title": "Single Text Field - skip to pg 3 if val = go",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field2"
    }, {
      "Title": "Checkbox - If checked, hide Check1Input below",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field449",
        "Label": "Hide Check1Input"
      }],
      "Type": "checkbox",
      "ID": "Field449",
      "Rules": [{
        "RuleId": "64",
        "Type": "Hide",
        "Setting": {
          "FieldName": "649",
          "FieldTypes": {
            "449": "checkbox"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "64",
          "FieldName": "449",
          "Filter": "is",
          "Value": "Hide Check1Input",
          "ReportId": "57",
          "RuleId": "64"
        }],
        "condition": {
          "ConditionId": "64",
          "FieldName": "449",
          "Filter": "is",
          "Value": "Hide Check1Input",
          "ReportId": "57",
          "RuleId": "64"
        }
      }]
    }, {
      "Title": "Checkbox - If checked, show Check2Input below",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field349",
        "Label": "Show Check2Input"
      }],
      "Type": "checkbox",
      "ID": "Field349",
      "Rules": [{
        "RuleId": "65",
        "Type": "Show",
        "Setting": {
          "FieldName": "650",
          "FieldTypes": {
            "349": "checkbox"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "65",
          "FieldName": "349",
          "Filter": "is",
          "Value": "Show Check2Input",
          "ReportId": "57",
          "RuleId": "65"
        }],
        "condition": {
          "ConditionId": "65",
          "FieldName": "349",
          "Filter": "is",
          "Value": "Show Check2Input",
          "ReportId": "57",
          "RuleId": "65"
        }
      }]
    }, {
      "Title": "Check1Input - Shown initially",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field649"
    }, {
      "Title": "Check2Input - Hidden initially",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "hide",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field650"
    }, {
      "Title": "Paragraph Field",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "textarea",
      "ID": "Field4"
    }, {
      "Title": "Paragraph Field - Required",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "textarea",
      "ID": "Field239"
    }, {
      "Title": "Multi Choice Field",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "radio",
      "ID": "Field105",
      "HasOtherField": false
    }, {
      "Title": "Multi Choice Field - Required!!?!!",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "radio",
      "ID": "Field241",
      "HasOtherField": false
    }, {
      "Title": "Number field - Range 2 - 8 Value",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "number",
      "ID": "Field242"
    }, {
      "Title": "Number field - Range 1 - 3 Digits",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "number",
      "ID": "Field243"
    }, {
      "Title": "Number field - required - Hide Checkbox field below if 7",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "number",
      "ID": "Field3",
      "Rules": [{
        "RuleId": "63",
        "Type": "Hide",
        "Setting": {
          "FieldName": "5",
          "FieldTypes": {
            "3": "number"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "63",
          "FieldName": "3",
          "Filter": "is equal to",
          "Value": "7",
          "ReportId": "57",
          "RuleId": "63"
        }],
        "condition": {
          "ConditionId": "63",
          "FieldName": "3",
          "Filter": "is equal to",
          "Value": "7",
          "ReportId": "57",
          "RuleId": "63"
        }
      }]
    }, {
      "Title": "Checkbox field - No Rules - Will hide if number field above is 7",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field5",
        "Label": "First Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field6",
        "Label": "Second Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field7",
        "Label": "Third Choice"
      }],
      "Type": "checkbox",
      "ID": "Field5"
    }, {
      "Title": "Checkbox field - required",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field244",
        "Label": "First Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field245",
        "Label": "Second Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field246",
        "Label": "Third Choice"
      }],
      "Type": "checkbox",
      "ID": "Field244"
    }, {
      "Title": "Dropdown Field - first empty",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": ""
      }, {
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "select",
      "ID": "Field344",
      "HasOtherField": false
    }, {
      "Title": "Dropdown Field - Required",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "select",
      "ID": "Field106",
      "HasOtherField": false
    }],
    "Rules": [{
      "RuleId": "60",
      "Type": "SkipToPage",
      "Setting": {
        "Page": "3"
      },
      "FormId": "57",
      "MatchType": "any",
      "Conditions": [{
        "ConditionId": "60",
        "FieldName": "2",
        "Filter": "is",
        "Value": "go",
        "ReportId": "57",
        "RuleId": "60"
      }],
      "condition": {
        "ConditionId": "60",
        "FieldName": "2",
        "Filter": "is",
        "Value": "go",
        "ReportId": "57",
        "RuleId": "60"
      }
    }]
  }, {
    "Title": "Fancy Fields",
    "Fields": [{
      "Title": "Name",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field110",
        "Label": "First"
      }, {
        "DefaultVal": "",
        "ID": "Field111",
        "Label": "Last"
      }],
      "Type": "shortname",
      "ID": "Field110"
    }, {
      "Title": "Attach a File",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "file",
      "ID": "Field112"
    }, {
      "Title": "Address",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field113",
        "Label": "Street Address"
      }, {
        "DefaultVal": "",
        "ID": "Field114",
        "Label": "Address Line 2"
      }, {
        "DefaultVal": "",
        "ID": "Field115",
        "Label": "City"
      }, {
        "DefaultVal": "",
        "ID": "Field116",
        "Label": "State / Province / Region"
      }, {
        "DefaultVal": "",
        "ID": "Field117",
        "Label": "Postal / Zip Code"
      }, {
        "DefaultVal": "",
        "ID": "Field118",
        "Label": "Country"
      }],
      "Type": "address",
      "ID": "Field113"
    }, {
      "Title": "Date",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "date",
      "ID": "Field119"
    }, {
      "Title": "Email",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "email",
      "ID": "Field120"
    }, {
      "Title": "Time",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "time",
      "ID": "Field121"
    }, {
      "Title": "Phone Number",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "phone",
      "ID": "Field122"
    }, {
      "Title": "Website",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "url",
      "ID": "Field123"
    }, {
      "Title": "Price Field - Amount Default",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field124"
    }, {
      "Title": "Price Field - Amount Euro",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field235"
    }, {
      "Title": "Likert - Evaluate the following statements.",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field125",
        "Label": "Statement One"
      }, {
        "DefaultVal": "0",
        "ID": "Field126",
        "Label": "Statement Two"
      }, {
        "DefaultVal": "0",
        "ID": "Field127",
        "Label": "Statement Three"
      }],
      "Choices": [{
        "Score": 1,
        "Label": "Strongly Disagree"
      }, {
        "Score": 2,
        "Label": "Disagree"
      }, {
        "Score": 3,
        "Label": "Agree"
      }, {
        "Score": 4,
        "Label": "Strongly Agree"
      }],
      "Type": "likert",
      "ID": "Field125",
      "HasOtherField": false
    }]
  }, {
    "Title": "FeedHenry Fields",
    "Fields": [{
      "Title": "fh fhgeo",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeo",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field228"
    }, {
      "Title": "fh fhgeoEN",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeoEN",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field229"
    }, {
      "Title": "fh fhcam 1/3 - Required",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "fh fhcam",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field227",
      "SubFields": [{
        "Title": "fh fhcam 2/3 - Required",
        "Instructions": "",
        "IsRequired": "1",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field346"
      }, {
        "Title": "fh fhcam 3/3 - Optional",
        "Instructions": "",
        "IsRequired": "0",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field345"
      }]
    }, {
      "Title": "fh fhsig",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhsig",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field230"
    }, {
      "Title": "fh fhmap",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhmap",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field231"
    }, {
      "Title": "fh fhtime",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhtime",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field232"
    }, {
      "Title": "fh fhdate",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhdate",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field233"
    }]
  }],
  "Theme": '#logo a {background-image:url(\"data:image/gif;base64,R0lGODlhHQEpAPcAAP39/v79/vz9//z+/v///vz//lpXWP/9///+/vz9/v3+/f3//f7//f/9/v7+/fz//f79/fz+/f39/fz9/VlXWP///TEtLpCOj/CWgP/+/ZCPj/fLwMfHxsbHxkxJSv/9/cbHx8bGxv38//z8/1pXV3VzdMbGx/78/o+Oj/38/v78/8bFx8fGx5GOjz47PMfHx8bFxvv+/8fGxuI6Efv9/pGPj/z8/v78/f3y72dlZoOBgvv//+dhQGhlZsjGx/W9sPOwoPbKv+x8YMfFx8fFxnZzdMjHxp2dnf38/ehiQfv+/tTU1dXU1MjGxllXV+VUMfGjkPDw8PDx8JCOjtbU1fz8/eZUMe/w8NTV1f/8/8jHx+diQOdiQfbJv+hhQY+Pj/v//tbV1e6JcO7w8J2cnPDv8epvUI+OjnVzc+Pi4p2cnbm4ubm5uaypq/nYz+/x8OdhQfXKv+Hj4+hhQPv//T87PPHw8fHx8ePh456cneLh41pWWNXV1e7x8NTV02dlZePi456dnZ2bnfbIv/bJvvbKvvnx7+Pj4u/v8ePi4dXT1OHi4/v9/5CPjvCij+t8YPvl3/Dw8fHx8MjFx4SBgrq4uNbU1PTKv/zx7+hiQKupqp6cnKyqq4KBgfji3/v9/f/8/eLj4vvx76qrqu/w8e+VgPXJv/vw7/Hv752bnP/8/vrl3YOBgfDx8e6WgNXU1bi4ubm3uPTIv6yrqvjXz9TT1e2JcOluUPrj3ayrq/v8/llWWOluUaqpqvry7tTU1O6VgPv8/+t7YfDx77q4uZGPju+Vf+Hj4vOwn/zw76yqqvnl3fXKvvjXzvKvn/v+/et7YMXFxvTJv+/v7+7v8aurqp2dnOPj4dPV1Lm5uOt8Ybq5uFpWV9bV1Kuqq/vx7uLi4fO9r/rv7/7+/GhkZuLh4vGij7i5uOHh49XU06urq/S8rqqrq5GOjvHx7+Hj4f/+//z+//z///39//79//7+/v7//v3//v3+/v7///3+//7+//3//yMfIOAtAf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE4MDgzRUI4M0M2MkJEN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5NkE3NEU2N0RDNTExRTFBQ0FFRTVCQzUwQjI5Q0E2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NkE3NEU1N0RDNTExRTFBQ0FFRTVCQzUwQjI5Q0E2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUI2MUMwQzg5MjA2ODExOEE2REY3NTdFMjY4QjBFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExODA4M0VCODNDNjJCRDdDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdm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\"); min-height:0;height:40px;}* html #logo a {background-image: none;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"http://www.feedhenry.com/wp-content/themes/feedhenry/images/logo.gif\", sizingMethod=\"crop\");}html{background-image:url(\"data:image/png;base64,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\");background-color:#00000a;}#logo{background-image:#eeeeee;background-color:#444444;}#container, html.embed{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{background:#DEDEDE;border:1px solid #a7a7a7;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;}.safari .wufoo select.select{font-size:#444444 !important;}.safari .wufoo input.file{background:none;border:none;}.wufoo li.focused{background-color:none;}.wufoo .instruct{background-color:#FFFFFF;}#container{border:#FFFFFF url(\"data:image/gif;base64,R0lGODlhBwACAIABAMzMzP///yH5BAEAAAEALAAAAAAHAAIAAAIFhA+hGwUAOw==\") repeat-x top #FFF7C0 #F5F5F5;}.wufoo .info, .wufoo .paging-context{border-bottom:3px solid #ffff33;}.wufoo .section h3, .wufoo .captcha, #payment .paging-context{border-top:3px solid #ffff33;}.wufoo input.text, .wufoo textarea.textarea{}.wufoo .instruct{border:5px dotted #006600;}.fixed .info{border-bottom:none;}.wufoo li.section.scrollText{border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wufoo .info h2{font-size:i:69;font-family:r:1;font-style:normal;font-weight:bold;color:inherit;}.wufoo .info div{font-size:#000000;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo .section h3{font-size:#444444;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo .section div{font-size:#000000;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo label.desc, .wufoo legend.desc{font-size:#444444;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo label.choice{font-size:#444444;font-family:bold;font-style:normal;font-weight:bold;color:inherit;}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{font-style:normal;font-weight:bold;color:inherit;font-size:#444444;}{* Custom Fonts Break Dropdown Selection in IE *}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file{ font-family:bold;}.safari .wufoo select.select{background:#DEDEDE;border:1px solid #a7a7a7;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:#444444 !important;}.wufoo li div, .wufoo li span, .wufoo li div label, .wufoo li span label{font-family:normal;color:inherit;}.safari .wufoo input.file{ font-size:#444444;font-family:normal;color:inherit;}.wufoo .instruct small{font-size:#333333;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.altInstruct small, li.leftHalf small, li.rightHalf small,li.leftThird small, li.middleThird small, li.rightThird small,.iphone small{color:inherit !important;}.wufoo input.btTxt{}.wufoo li.focused label.desc, .wufoo li.focused legend.desc,.wufoo li.focused div, .wufoo li.focused span, .wufoo li.focused div label, .wufoo li.focused span label,.safari .wufoo li.focused input.file{ color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.confirm h2{font-family:normal;color:inherit;}a.powertiny b, a.powertiny em{color:#e6e6e6 !important;}.embed a.powertiny b, .embed a.powertiny em{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#1a1a1a !important;}.pgStyle1 var, .pgStyle2 var, .pgStyle2 em, .page1 .pgStyle2 var, .pgStyle1 b, .wufoo .buttons .marker{font-family:normal;color:inherit;}.pgStyle1 var, .pgStyle2 td{border:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.pgStyle1 .done var{background:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.pgStyle1 .selected var, .pgStyle2 var, .pgStyle2 var em{background:none;color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.pgStyle1 .selected var{border:1px solid Background color \'none\' is not a hex color value.#;}.buttons button, .buttons button:hover{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}.likert table{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}.likert thead td, .likert thead th{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert tbody tr.alt td, .likert tbody tr.alt th{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert table, .likert th, .likert td{border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert td{border-left:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert caption, .likert thead td, .likert tbody th label{color:inherit;font-family:normal;}.likert tbody td label{color:Background color \'inherit\' is not a hex color value.#;font-family:normal;}.likert caption, .likert tbody th label{font-size:#444444;}.likert tbody tr:hover td, .likert tbody tr:hover th, .likert tbody tr:hover label{background-color:none;color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.likert tbody tr:hover td{border-left:1px solid Background color \'none\' is not a hex color value.#;}.wufoo #lola{background:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wufoo #lola tbody td{border-bottom:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wufoo #lola{font-family:normal;color:inherit;}.wufoo #lola tfoot th{color:Background color \'inherit\' is not a hex color value.#;}.wufoo .wfo_graph h3{font-size:#444444;font-family:normal;color:inherit;}.wfo_txt, .wfo_graph h4{color:inherit;}.wufoo .footer h4{color:inherit;}.wufoo .footer span{color:inherit;}.wfo_number{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wfo_number strong, .wfo_number em{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}#widget, #widget body{background:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}.fcNav a.show{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc table{border-left:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc thead th, .fc .more th{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.# !important;border-right:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.# !important;}.fc tbody td, .fc tbody th, .fc tfoot th, .fc tfoot td{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");border-right:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;border-bottom:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc tbody tr.alt td, .fc tbody tr.alt th, .fc tbody td.alt{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc caption, .fcNav, .fcNav a{color:inherit;}.fc tfoot, .fc thead th,.fc tbody th div, .fc tbody td.count, .fc .cards tbody td a, .fc td.percent var,.fc .timestamp span{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}.fc .indent .count{color:Background color \'inherit\' is not a hex color value.#;}.fc .cards tbody td a span{color:Background color \'inherit\' is not a hex color value.#;}.fc tbody tr:hover td, .fc tbody tr:hover th,.fc tfoot tr:hover td, .fc tfoot tr:hover th{background-color:none;}.fc tbody tr:hover th div, .fc tbody tr:hover td, .fc tbody tr:hover var,.fc tfoot tr:hover th div, .fc tfoot tr:hover td, .fc tfoot tr:hover var{color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.invoice thead th, .invoice tbody th, .invoice tbody td,.invoice tfoot th,.invoice .total,.invoice tfoot .last th, .invoice tfoot .last td,.invoice tfoot th, .invoice tfoot td{border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.invoice thead th, .wufoo .checkNotice{background:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.invoice th, .invoice td{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}#ppSection, #ccSection{border-bottom:3px solid #ffff33;}#shipSection, #invoiceSection{border-top:3px solid #ffff33;}@media only screen and (max-width: 480px) {html{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}a.powertiny b, a.powertin em{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#1a1a1a !important;}}',
  "Rules": [{
    "RuleId": "62",
    "Type": "ShowMessage",
    "Setting": {
      "Message": "Success! Thanks for filling out my form!"
    },
    "FormId": "57",
    "MatchType": "any",
    "Conditions": [{
      "ConditionId": "62",
      "FieldName": "1",
      "Filter": "is",
      "Value": "",
      "ReportId": "57",
      "RuleId": "62"
    }]
  }]
};

App.MockSimplerMultiPageForm = {
  "Name": "Simple Multi Page Form",
  "Description": "This is my form. Please fill it out. It's awesome!",
  "RedirectMessage": "Great! Thanks for filling out my form!",
  "Url": "test-form",
  "Email": "",
  "IsPublic": "1",
  "Language": "english",
  "StartDate": "2000-01-01 12:00:00",
  "EndDate": "2030-01-01 12:00:00",
  "EntryLimit": "0",
  "DateCreated": "2012-10-22 09:43:15",
  "DateUpdated": "2012-10-30 09:53:10",
  "Hash": "z7x3p9",
  "LinkFields": "https://mnairn.wufoo.com/api/v3/forms/z7x3p9/fields.json",
  "LinkEntries": "https://mnairn.wufoo.com/api/v3/forms/z7x3p9/entries.json",
  "LinkEntriesCount": "https://mnairn.wufoo.com/api/v3/forms/z7x3p9/entries/count.json",
  "PaginationType": "tab",
  "NoPageTitles": false,
  "Pages": [{
    "Title": "Page asdasdasdasdasdasdasdasdasdasdasdas 1",
    "Fields": [{
      "Title": "fh fhgeo",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeo",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field228"
    }, {
      "Title": "fh fhgeoEN",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeoEN",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field229"
    }, {
      "Title": "fh fhcam 1/3 - Required",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "fh fhcam",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field227",
      "SubFields": [{
        "Title": "fh fhcam 2/3 - Required",
        "Instructions": "",
        "IsRequired": "1",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field346"
      }, {
        "Title": "fh fhcam 3/3 - Optional",
        "Instructions": "",
        "IsRequired": "0",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field345"
      }]
    }, {
      "Title": "fh fhsig",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhsig",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field230"
    }, {
      "Title": "fh fhmap",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhmap",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field231"
    }, {
      "Title": "fh fhtime",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhtime",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field232"
    }, {
      "Title": "fh fhdate",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhdate",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field233"
    }, {
      "Title": "Test Field 1",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field1",
      "Rules": [{
        "RuleId": "1",
        "Type": "Hide",
        "Setting": {
          "FieldName": "8",
          "FieldTypes": {
            "1": "text"
          }
        },
        "FormId": "1",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "1",
          "FieldName": "1",
          "Filter": "is",
          "Value": "Mike",
          "ReportId": "1",
          "RuleId": "1"
        }],
        "condition": {
          "ConditionId": "1",
          "FieldName": "1",
          "Filter": "is",
          "Value": "Mike",
          "ReportId": "1",
          "RuleId": "1"
        }
      }]
    }, {
      "Title": "Test Field 2",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field8"
    }],
    "Rules": [{
      "RuleId": "2",
      "Type": "SkipToPage",
      "Setting": {
        "Page": "3"
      },
      "FormId": "1",
      "MatchType": "any",
      "Conditions": [{
        "ConditionId": "2",
        "FieldName": "1",
        "Filter": "is",
        "Value": "Mike",
        "ReportId": "1",
        "RuleId": "2"
      }],
      "condition": {
        "ConditionId": "2",
        "FieldName": "1",
        "Filter": "is",
        "Value": "Mike",
        "ReportId": "1",
        "RuleId": "2"
      }
    }]
  }, {
    "Title": "Page 2",
    "Fields": [{
      "Title": "Select a Choice",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "radio",
      "ID": "Field2",
      "HasOtherField": false
    }]
  }, {
    "Title": "Page 3",
    "Fields": [{
      "Title": "Select a Choice",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "3",
      "Choices": [{
        "Label": ""
      }, {
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "select",
      "ID": "Field9",
      "HasOtherField": false
    }]
  }],
  "Theme": "#logo a {background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoCAMAAACVZWnNAAAAllBMVEX///////8AAAA7OzuZmZnt7e0AAAAODg4dHR15eXkAAAC6urrc3NxZWVkAAAAAAABKSkoAAAAAAACJiYkAAACpqakAAAAsLCwAAADLy8sAAABpaWkAAAD///8AAADZ2dn8/Pz7+/sAAAD+/v56enr9/f3q6uqpqakAAADq6upra2tbW1v8/Pw9PT0AAAAeHh4tLS09PT3gXOGyAAAALnRSTlMA5YD57+e//fzyQOzo9TAg9xDv8K/tj/rP6t/0n/Jw+fT2YPP99Pj7UPf9/vX9/PlC0wAAAZ1JREFUeF7d1ddyozAYQGFAlSIguPe0reU4ef+XW3ZsDfYsKHCbc//Nz8CPFH22qiz5V1ZNluVyi2+7LKfQTAMilXmez3YC0NlY+jAHK1XsU9LC/HmvtQ4+Q7ZvAOwivq/l13QVGAng/NQu5bxuyn67BgAZ9yW9XvfiZWeD+nuPrQBgFg+VcinpwUcA6ng4MYwTAFMEcBHGpB4EHrwcwEYFcQEw711nwMXhalg/RH1pWHyAJfOov6pBfYALdDQQ9gaoPFe5Ey6/06YZxKKz0oD5f+MEI/CCrmIqtgBwPgNuIt4Ap29w+gqYUbgxHs/g/PjE+8vLO6DGvDDNptvDty+/eT0cWsxmzKc6knbvix9P/Dw8noHbJUmGcIVRfgL8em2nn4BVh1cMn4B7dvElBwB/3u6OhxwdOHQbpB+NBWpzO1hZQud3xlWnZqNkuohVTbefNfMo1DPUqsVi58XK+bnC/46DlVtMWsS18NgJv+zeBnpIgNoh8uu6yFYWMwtLb0NVyRYAK4QwrGRa20l3XZlobtPHavLlfikro8/VX9MgQxYUruF/AAAAAElFTkSuQmCC\"); min-height:0;height:40px;}* html #logo a {background-image: none;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/images/themes/logos/panda.png\", sizingMethod=\"crop\");}html{background-image:url(\"data:image/gif;base64,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\");background-color:#eeeeee;}#logo{background-image:url(\"data:image/png;base64,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\");background-color:#dedede;}#container, html.embed{background-color:#f0fff0;}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{background:#ffffcc;border:1px solid #bfbf99;border-bottom:1px solid #dedeb1;border-right:1px solid #dedeb1;}.safari .wufoo select.select{font-size:100% !important;}.safari .wufoo input.file{background:none;border:none;}.wufoo li.focused{background-color:#ffcc33;}.wufoo .instruct{background-color:#f5f5f5;}#container{border:1px solid #CCCCCC;}.wufoo .info, .wufoo .paging-context{border-bottom:1px dotted #CCCCCC;}.wufoo .section h3, .wufoo .captcha, #payment .paging-context{border-top:1px dotted #CCCCCC;}.wufoo input.text, .wufoo textarea.textarea{}.wufoo .instruct{border:1px solid #E6E6E6;}.fixed .info{border-bottom:none;}.wufoo li.section.scrollText{border-color:#d1ded1;}.wufoo .info h2{font-size:160%;font-family:inherit;font-style:normal;font-weight:normal;color:#000000;}.wufoo .info div{font-size:95%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.wufoo .section h3{font-size:110%;font-family:inherit;font-style:normal;font-weight:normal;color:#000000;}.wufoo .section div{font-size:85%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.wufoo label.desc, .wufoo legend.desc{font-size:95%;font-family:inherit;font-style:normal;font-weight:bold;color:#444444;}.wufoo label.choice{font-size:100%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{font-style:normal;font-weight:normal;color:#333333;font-size:100%;}{* Custom Fonts Break Dropdown Selection in IE *}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file{ font-family:inherit;}.wufoo li div, .wufoo li span, .wufoo li div label, .wufoo li span label{font-family:inherit;color:#444444;}.safari .wufoo input.file{ font-size:100%;font-family:inherit;color:#444444;}.wufoo .instruct small{font-size:80%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.altInstruct small, li.leftHalf small, li.rightHalf small,li.leftThird small, li.middleThird small, li.rightThird small,.iphone small{color:#444444 !important;}.wufoo input.btTxt{}.wufoo li.focused label.desc, .wufoo li.focused legend.desc,.wufoo li.focused div, .wufoo li.focused span, .wufoo li.focused div label, .wufoo li.focused span label,.safari .wufoo li.focused input.file{ color:#000000;}.confirm h2{font-family:inherit;color:#444444;}a.powertiny b, a.powertiny em{color:#1a1a1a !important;}.embed a.powertiny b, .embed a.powertiny em{color:#1a1a1a !important;}.pgStyle1 var, .pgStyle2 var, .pgStyle2 em, .page1 .pgStyle2 var, .pgStyle1 b, .wufoo .buttons .marker{font-family:inherit;color:#444444;}.pgStyle1 var, .pgStyle2 td{border:1px solid #c0ccc0;}.pgStyle1 .done var{background:#c0ccc0;}.pgStyle1 .selected var, .pgStyle2 var, .pgStyle2 var em{background:#ffcc33;color:#000000;}.pgStyle1 .selected var{border:1px solid #e6b82e;}.buttons button, .buttons button:hover{color:#000000;}.likert table{background-color:#f0fff0;}.likert thead td, .likert thead th{background-color:#d8e6d8;}.likert tbody tr.alt td, .likert tbody tr.alt th{background-color:#e6f5e6;}.likert table, .likert th, .likert td{border-color:#d1ded1;}.likert td{border-left:1px solid #c0ccc0;}.likert caption, .likert thead td, .likert tbody th label{color:#444444;font-family:inherit;}.likert tbody td label{color:#575757;font-family:inherit;}.likert caption, .likert tbody th label{font-size:95%;}.likert tbody tr:hover td, .likert tbody tr:hover th, .likert tbody tr:hover label{background-color:#ffcc33;color:#000000;}.likert tbody tr:hover td{border-left:1px solid #cca329;}.wufoo #lola{background:#d8e6d8;}.wufoo #lola tbody td{border-bottom:1px solid #c0ccc0;}.wufoo #lola{font-family:inherit;color:#444444;}.wufoo #lola tfoot th{color:#696969;}.wufoo .wfo_graph h3{font-size:95%;font-family:inherit;color:#444444;}.wfo_txt, .wfo_graph h4{color:#444444;}.wufoo .footer h4{color:#000000;}.wufoo .footer span{color:#444444;}.wfo_number{background-color:#e6f5e6;border-color:#d1ded1;}.wfo_number strong, .wfo_number em{color:#000000;}#widget, #widget body{background:#f0fff0;}.fcNav a.show{background-color:#f0fff0;border-color:#c0ccc0;}.fc table{border-left:1px solid #d1ded1;}.fc thead th, .fc .more th{background-color:#d1ded1 !important;border-right:1px solid #c0ccc0 !important;}.fc tbody td, .fc tbody th, .fc tfoot th, .fc tfoot td{background-color:#f0fff0;border-right:1px solid #c0ccc0;border-bottom:1px solid #d1ded1;}.fc tbody tr.alt td, .fc tbody tr.alt th, .fc tbody td.alt{background-color:#e6f5e6;}.fc caption, .fcNav, .fcNav a{color:#444444;}.fc tfoot, .fc thead th,.fc tbody th div, .fc tbody td.count, .fc .cards tbody td a, .fc td.percent var,.fc .timestamp span{color:#000000;}.fc .indent .count{color:#4b4b4b;}.fc .cards tbody td a span{color:#7d7d7d;}.fc tbody tr:hover td, .fc tbody tr:hover th,.fc tfoot tr:hover td, .fc tfoot tr:hover th{background-color:#ffcc33;}.fc tbody tr:hover th div, .fc tbody tr:hover td, .fc tbody tr:hover var,.fc tfoot tr:hover th div, .fc tfoot tr:hover td, .fc tfoot tr:hover var{color:#000000;}.invoice thead th, .invoice tbody th, .invoice tbody td,.invoice tfoot th,.invoice .total,.invoice tfoot .last th, .invoice tfoot .last td,.invoice tfoot th, .invoice tfoot td{border-color:#d1ded1;}.invoice thead th, .wufoo .checkNotice{background:#e6f5e6;}.invoice th, .invoice td{color:#000000;}#ppSection, #ccSection{border-bottom:1px dotted #CCCCCC;}#shipSection, #invoiceSection{border-top:1px dotted #CCCCCC;}@media only screen and (max-width: 480px) {html{background-color:#f0fff0;}a.powertiny b, a.powertin em{color:#1a1a1a !important;}}",
  "Rules": []
};

App.MockSimpleSinglePageForm = {
  "Name": "Single Page Form",
  "Description": "Simple single page form",
  "RedirectMessage": "Great! Thanks for filling out my form!",
  "Url": "single-page-form",
  "Email": "",
  "IsPublic": "1",
  "Language": "english",
  "StartDate": "2000-01-01 12:00:00",
  "EndDate": "2030-01-01 12:00:00",
  "EntryLimit": "0",
  "DateCreated": "2012-11-01 02:54:19",
  "DateUpdated": "2012-11-01 02:54:19",
  "Hash": "m7x3q1",
  "LinkFields": "https://mnairn.wufoo.com/api/v3/forms/m7x3q1/fields.json",
  "LinkEntries": "https://mnairn.wufoo.com/api/v3/forms/m7x3q1/entries.json",
  "LinkEntriesCount": "https://mnairn.wufoo.com/api/v3/forms/m7x3q1/entries/count.json",
  "PaginationType": "tab",
  "NoPageTitles": false,
  "Pages": [{
    "Fields": [{
      "Title": "Likert - Evaluate the following statements.",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field125",
        "Label": "Statement One"
      }, {
        "DefaultVal": "0",
        "ID": "Field126",
        "Label": "Statement Two"
      }, {
        "DefaultVal": "0",
        "ID": "Field127",
        "Label": "Statement Three"
      }],
      "Choices": [{
        "Score": 1,
        "Label": "Strongly Disagree"
      }, {
        "Score": 2,
        "Label": "Disagree"
      }, {
        "Score": 3,
        "Label": "Agree"
      }, {
        "Score": 4,
        "Label": "Strongly Agree"
      }],
      "Type": "likert",
      "ID": "Field125",
      "HasOtherField": false
    }, {
      "Title": "Name",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field110",
        "Label": "First"
      }, {
        "DefaultVal": "",
        "ID": "Field111",
        "Label": "Last"
      }],
      "Type": "shortname",
      "ID": "Field110"
    }, {
      "Title": "Address",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field113",
        "Label": "Street Address"
      }, {
        "DefaultVal": "",
        "ID": "Field114",
        "Label": "Address Line 2"
      }, {
        "DefaultVal": "",
        "ID": "Field115",
        "Label": "City"
      }, {
        "DefaultVal": "",
        "ID": "Field116",
        "Label": "State / Province / Region"
      }, {
        "DefaultVal": "",
        "ID": "Field117",
        "Label": "Postal / Zip Code"
      }, {
        "DefaultVal": "",
        "ID": "Field118",
        "Label": "Country"
      }],
      "Type": "address",
      "ID": "Field113"
    }, {
      "Title": "Date",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "date",
      "ID": "Field119"
    }, {
      "Title": "Email",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "email",
      "ID": "Field120"
    }, {
      "Title": "Time",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "time",
      "ID": "Field121"
    }, {
      "Title": "Phone Number",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "phone",
      "ID": "Field122"
    }, {
      "Title": "Website",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "url",
      "ID": "Field123"
    }, {
      "Title": "Price Field - Amount Default",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field124"
    }, {
      "Title": "Price Field - Amount Euro",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field235"
    }]
  }],
  "Theme": "",
  "Rules": []
};

