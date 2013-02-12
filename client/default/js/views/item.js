ItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'pending_submission',
  events: {
    'click button.delete-item': 'delete',
    'click button.submit-item': 'submit',
    'click': 'show'
  },

  templates: {
    item_failed: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type <%= error_type %>"><%= error_message %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Retry</button><span class="chevron"></span>',
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Submit</button><span class="chevron"></span>'
  },

  errorTypes: {
    "validation": "Validation Error. Please review for details.",
    "offline": "Offline during submission. Ok to resubmit",
    "network": "Network issue during submission. Ok to resubmit",
    "timeout": "Form Submission timeout. Please try again later",
    "defaults": "Unknown Error. Please review for details"
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show', 'delete', 'submit');
    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  renderId: function() {
    if(this.model.idValue) {
      return this.model.idValue;
    }
    if(this.model.id) {
      return this.model.id.split(/-/)[0];
    }
    return "new";
  },

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var template = this.templates.item;
    if(error && this.templates.item_failed) {
      template = this.templates.item_failed;
    }
    var item = _.template(template, {
      name: this.model.get('Name'),
      id: this.renderId(),
      timestamp: time,
      error_type: (error && error.type ) ? error.type : null,
      error_message: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults
    });

    $(this.el).html(item);
    return this;
  },

  "delete": function(e) {
    e.stopPropagation();

    var confirmDelete = confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      this.model.destroy();
    }

    return false;
  },

  submit: function() {
    var model = this.model;
    //var idField = _.find(model.fields)(function (field) {return field.isIdField();});
    model.load(function (err,actual ){
      var json = actual.toJSON();
      delete json.idValue;
//      if(idField) {
//        json.idValue = idField.value();
//      }
      //Delete the id, or it might not get re-created on failure
      App.collections.pending_submitting.create(json);
      model.destroy();
    });

    return false;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    this.model.load(function (err,actual ){
      var draft = new DraftModel(actual.toJSON());
      App.views.form = new DraftView({model: draft});
      App.views.form.render();
    });
  }
});