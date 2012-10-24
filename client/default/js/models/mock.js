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
  "DateUpdated": "2012-10-24 04:16:34",
  "Hash": "s7w7z7",
  "LinkFields": "https:\/\/feedhenry.wufoo.com\/api\/v3\/forms\/s7w7z7\/fields.json",
  "LinkEntries": "https:\/\/feedhenry.wufoo.com\/api\/v3\/forms\/s7w7z7\/entries.json",
  "LinkEntriesCount": "https:\/\/feedhenry.wufoo.com\/api\/v3\/forms\/s7w7z7\/entries\/count.json",
  "Fields": [{
    "Title": "Entry Id",
    "Type": "text",
    "ID": "EntryId"
  }, {
    "Title": "Single Text Field - No Rules",
    "Instructions": "",
    "IsRequired": "0",
    "ClassNames": "",
    "DefaultVal": "predefined value",
    "Page": "1",
    "Type": "text",
    "ID": "Field1"
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
    "Title": "Paragraph Field",
    "Instructions": "",
    "IsRequired": "0",
    "ClassNames": "",
    "DefaultVal": "",
    "Page": "1",
    "Type": "textarea",
    "ID": "Field4"
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
    "Title": "Number field - required",
    "Instructions": "",
    "IsRequired": "1",
    "ClassNames": "",
    "DefaultVal": "",
    "Page": "1",
    "Type": "number",
    "ID": "Field3"
  }, {
    "Title": "Checkbox field - required",
    "Instructions": "",
    "IsRequired": "1",
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
    "Title": "Dropdown Field",
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
    "ID": "Field106",
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
      "Label": "State \/ Province \/ Region"
    }, {
      "DefaultVal": "",
      "ID": "Field117",
      "Label": "Postal \/ Zip Code"
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
    "Title": "Price Field - Amount",
    "Instructions": "",
    "IsRequired": "0",
    "ClassNames": "",
    "DefaultVal": "",
    "Page": "2",
    "Type": "money",
    "ID": "Field124"
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
  }, {
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
    "Title": "fh fhcam",
    "Instructions": "",
    "IsRequired": "0",
    "ClassNames": "fh fhcam",
    "DefaultVal": "",
    "Page": "3",
    "Type": "file",
    "ID": "Field227"
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
    "Title": "Date Created",
    "Type": "date",
    "ID": "DateCreated"
  }, {
    "Title": "Created By",
    "Type": "text",
    "ID": "CreatedBy"
  }, {
    "Title": "Last Updated",
    "Type": "date",
    "ID": "LastUpdated"
  }, {
    "Title": "Updated By",
    "Type": "text",
    "ID": "UpdatedBy"
  }]
};