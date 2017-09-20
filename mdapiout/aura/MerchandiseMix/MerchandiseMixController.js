({
    doInit : function(component, event, helper) {
        var mixId = component.get("v.recordId");
		helper.loadMixItems(component, mixId);
    },

    dropHandler : function(component, event, helper) {
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.removeClass(cmpTarget, 'active');
        var mixItems = component.get("v.mixItems");
        var merchandise = JSON.parse(event.dataTransfer.getData("merchandise"));
        var mixItem = {
            Merchandising_Mix__c: component.get("v.recordId"),
            Merchandise__c: merchandise.Id,
            Qty__c: 10,
            Merchandise__r: {
                Id: merchandise.Id,
                Name: merchandise.Name,
                Price__c: merchandise.Price__c,
                Category__c: merchandise.Category__c,
                Picture_URL__c: merchandise.Picture_URL__c
            }
        };
        mixItems.push(mixItem);
        helper.addItem(component, mixItem);
        component.set("v.mixItems", mixItems);
    },

    dragOverHandler : function(component, event) {
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.addClass(cmpTarget, 'active');
    },

    dragLeaveHandler : function(component, event){
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.removeClass(cmpTarget, 'active');
    },

    mixItemDeleteHandler : function(component, event, helper) {
        var mixItem = event.getParam("mixItem");
        helper.removeItem(component, mixItem);
    },

    mixItemChangeHandler : function(component, event, helper) {
        var mixItem = event.getParam("mixItem");
        helper.updateItem(component, mixItem);
    }

})