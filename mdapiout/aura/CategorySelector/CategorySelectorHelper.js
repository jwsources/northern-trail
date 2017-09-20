({
        loadCategories: function (component) {
                var action = component.get("c.getCategories");
                action.setCallback(this, function (response) {
                        var categories = response.getReturnValue();
                        if (categories) {
                                categories.unshift("");
                                window.DataCache.setData("categories", categories);
                                component.set("v.categories", categories);
                        }
                });
                $A.enqueueAction(action);
        }

})