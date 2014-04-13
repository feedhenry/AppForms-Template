PendingSubmittingItemView = ItemView.extend({
    templates: {
        //item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
        item: '<td><%= name %></td><td><%= id %></td><td><%= timestamp %></td><td><div class="progress"><div class="progress-bar col-xs-12" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" id="<%= localSubId%>">0%</div></div></td>'
    },

    render: function() {
        var time = new moment(this.model.get('uploadStartDate')).format('HH:mm:ss DD/MM/YYYY');
        var item = _.template(this.templates.item, {
            name: this.model.get('formName'),
            id: this.model.get("formId"),
            timestamp: time,
            localSubId: this.model.get("_ludid")
        });

        $(this.$el).html(item);
        return this;
    }
});