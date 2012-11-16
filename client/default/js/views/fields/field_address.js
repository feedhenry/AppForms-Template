FieldAddressView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    input: '<span class="fancy_name"><label for="<%= id %>"><%= label %></label><input id="<%= id %>" name="<%= id %>" type="text" class="field text <%= classes %>" value="<%= value %>"/></span>',
    countries_select: '<span class="fancy_name"><label for="<%= id %>">Country</label><select id="<%= id %>" name="<%= id %>" class="<%= classes %>"></select></span>',
    countries_option: '<option><%= value %></option>'
  },

  // TODO: allow for default country specified in wufoo form builder?
  countries: ["", "United States", "United Kingdom", "Ireland", "----", "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Saint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan Da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French Part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.addClass('address');
    this.$el.append(title);

    // TODO: Fancy country
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var formattedLabel = subfield.Label.toLowerCase().replace(/\s|\//g, '');
      if (subfield.Label === 'Country') {
        var select = $(_.template(self.templates.countries_select, {
          "id": subfield.ID,
          "classes": formattedLabel
        }));

        // Build countries list
        $.each(self.countries, function(i, country) {
          var option = $(_.template(self.templates.countries_option, {
            "value": country
          }));
          $('select', select).append(option);
        });

        self.$el.append(select);
      } else {
        var choice_field = $(_.template(self.templates.input, {
          "id": subfield.ID,
          "label": subfield.Label,
          "classes": (['streetaddress', 'city', 'postalzipcode'].indexOf(formattedLabel) < 0 ? 'validate_ignore ' : ' ') + formattedLabel,
          "value": subfield.DefaultVal
        }));

        self.$el.append(choice_field);
      }
    });

    var br = $('<br>').css('clear', 'left');
    self.$el.append(br);

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addValidationRules: function () {
    if (this.isRequired()) {
      var message = 'Please fill in the highlighted fields.';
      // street
      this.$el.find('.streetaddress, .city, .postalzipcode, select').each(function (index) { // have to do each as validate plugin runs for first item in selector only
        $(this).rules('add', {
          required: true
        });
      });
    }
  }

});