({
    doInit: function(component, event, helper) {
        var filterObject = {
            searchKey: '',
            category: ''
        };
        component.set("v.filterObject", filterObject);
        helper.loadMerchandise(component);
    },

    onPreviousPage: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        page = page - 1;
        helper.loadMerchandise(component, page);
	},

	onNextPage: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        page = page + 1;
        helper.loadMerchandise(component, page);
	},

    filterChangeHandler: function(component, event, helper) {
        var filterObject = component.get("v.filterObject");
        if (event.getParam("searchKey") !== undefined) {
	        filterObject.searchKey = event.getParam("searchKey");
        }
        if (event.getParam("category") !== undefined) {
	        filterObject.category = event.getParam("category");
        }
        helper.loadMerchandise(component);
    },

    rangeChange: function(component, event, helper) {
        var filterName = event.getParam("filterName");
        var minValue = event.getParam("minValue");
        var maxValue = event.getParam("maxValue");
        var filterObject = component.get("v.filterObject");
        if (filterName === 'MSRP') {
	        filterObject.minPrice = minValue;
	        filterObject.maxPrice = maxValue;
        }
        helper.loadMerchandise(component);
    }

})