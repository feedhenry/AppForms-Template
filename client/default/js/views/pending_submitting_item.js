PendingSubmittingItemView = ItemView.extend({
    templates: {
    },
    getIdText: function(){
        return this.model.get("_ludid");  
    },
    getItemTime: function(){
        return "Uploaded Started At: <br/>" + (new moment(this.model.get('uploadStartDate')).format('HH:mm:ss DD/MM/YYYY'));  
    },
    getButtons : function(){
        return false;
    },
    getType: function(){
        return "Queued";
    }
});