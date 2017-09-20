({
	afterScriptsLoaded : function(component, event, helper) {
        var assetClasses = window.DataCache.getData("assetClasses");
        if (assetClasses) {
            console.log('product categories retrieved from custom cache');
            component.set("v.categories", assetClasses);
        } else {
	    	helper.loadCategories(component);    
        }
	},
    
    changeHandler : function(component, event, helper) {
        var changeEvent = component.getEvent("onchange");
        changeEvent.setParams({
            "value": component.get("v.selectedValue")
        });
        changeEvent.fire();
    }
    
})