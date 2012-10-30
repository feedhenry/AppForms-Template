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
      "ID": "Field227"
    }, {
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
  "Theme": "/*Theme goes here!*/",
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