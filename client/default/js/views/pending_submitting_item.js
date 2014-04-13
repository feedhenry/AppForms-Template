PendingSubmittingItemView = ItemView.extend({
    templates: {
        //item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
        item: '<td><%= name %></td> <td><%= id %></td><%= timestamp %></td><td><div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div></td>'
    },

    render: function() {
        var time = new moment(this.model.get('uploadStartDate')).format('HH:mm:ss DD/MM/YYYY');
        var item = _.template(this.templates.item, {
            name: this.model.get('formName'),
            id: this.model.get("formId"),
            timestamp: time
        });

        $(this.$el).html(item);
        return this;
    }
});