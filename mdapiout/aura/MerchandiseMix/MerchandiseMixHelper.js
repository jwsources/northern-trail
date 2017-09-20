({
    loadMixItems : function(component, mixId) {
        var action = component.get("c.getMixItems");
        action.setStorable();
		action.setParams({
      		"mixId": mixId
	    	});
	    	action.setCallback(this, function(response) {
			var result = response.getReturnValue();
            component.set("v.mixItems", result);
            this.calculateMix(component);
	    	});
	    	$A.enqueueAction(action);
	},

	addItem : function(component, mixItem) {
        var action = component.get("c.addMixItem");
		action.setParams({
      		"mixId": mixItem.Merchandising_Mix__c,
      		"productId": mixItem.Merchandise__c,
      		"qty": mixItem.Qty__c
	    	});
	    	action.setCallback(this, function(response) {
			var result = response.getReturnValue();
            mixItem.Id = result.Id;
            this.calculateMix(component);
	    	});
	    	$A.enqueueAction(action);
	},

    updateItem : function(component, mixItem) {
        var action = component.get("c.updateMixItem");
		action.setParams({
      		"mixItem": mixItem
	    	});
		action.setCallback(this, function(response) {
            this.calculateMix(component);
	    	});
	    	$A.enqueueAction(action);
	},

	removeItem : function(component, mixItem) {
        var action = component.get("c.removeMixItem");
		action.setParams({
      		"mixItemId": mixItem.Id
	    	});
	    	action.setCallback(this, function(response) {
	    		var result = response.getReturnValue();
	    		var mixItems = component.get("v.mixItems");
            for (var i=0; i<mixItems.length; i++) {
                if(mixItems[i].Id === mixItem.Id) {
                    mixItems.splice(i, 1);
                    component.set("v.mixItems", mixItems);
                    this.calculateMix(component);
                    return;
                }
            }
	    	});
	    	$A.enqueueAction(action);
	},

    calculateMix : function(component) {
        var mixItems = component.get("v.mixItems");
        var oldTotalMSRP = component.get("v.totalMSRP");
        var totalQty = 0;
        var totalMSRP = 0;
        if (mixItems && Array.isArray(mixItems)) {
            mixItems.forEach(function(mixItem) {
      			totalQty = totalQty + mixItem.Qty__c;
                totalMSRP = totalMSRP + (mixItem.Qty__c * mixItem.Merchandise__r.Price__c);
            });
            component.set("v.totalQty", totalQty);
            component.set("v.totalMSRP", totalMSRP);
            var totalMSRPEl = component.find("totalMSRP");
            if (totalMSRPEl && totalMSRPEl.getElement()) {
                var numAnim = new CountUp(totalMSRPEl.getElement(), oldTotalMSRP, totalMSRP, 0, 0.5);
                numAnim.start();
            }
        }
    }

})