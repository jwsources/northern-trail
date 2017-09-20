({
    scriptsLoaded : function(component) {

        var data = {
            labels: ["Womens", "Mens", "Kids", "Gear", "Electronics"],
            datasets: [
                {
                    data: [0, 0, 0, 0, 0, 1],
                    backgroundColor: [
                        "rgba(126,139,228,.8)",
                        "rgba(84,105,141,.8)",
                        "rgba(254,143,96,.8)",
                        "rgba(125,195,125,.8)",
                        "rgba(52,190,205,.8)",
                        "#E0E5EE"
                    ],
                        hoverBackgroundColor: [
                        "rgba(126,139,228,.8)",
                        "rgba(84,105,141,.8)",
                        "rgba(254,143,96,.8)",
                        "rgba(125,195,125,.8)",
                        "rgba(52,190,205,.8)",
                        "#E0E5EE"
                    ]
                }
            ]
        };

        var ctx = component.find("chart").getElement();
        component.chart = new Chart(ctx,{
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutoutPercentage: 60,
                legend: {
                    position: "right",
                    display: false
                }
            }

        });

    },

    mixItemsChangeHandler: function(component) {
        if (component.chart && component.chart.data && component.chart.data.datasets[0]) {
            var mixItems = component.get("v.mixItems");
            if (mixItems && Array.isArray(mixItems)) {
                var map = {};
                mixItems.forEach(function(mixItem) {
                    map[mixItem.Merchandise__r.Category__c] = (map[mixItem.Merchandise__r.Category__c] || 0) + (mixItem.Qty__c * mixItem.Merchandise__r.Price__c);
                });
                var data = [
                    map.Womens || 0,
                    map.Mens || 0,
                    map.Kids || 0,
                    map.Gear || 0,
                    map.Electronics || 0
                ];
                component.chart.data.datasets[0].data = data;
                component.chart.update();
            }
        }
    }

})