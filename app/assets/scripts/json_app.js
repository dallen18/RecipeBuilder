//load main app logic
function loadApp() {
    "use strict";

    function buildOutput(response) {
        //get yelp results
        var $yelpResults = response.businesses;
        //process results array
        $yelpResults.forEach(function (item) {
            if (item !== null) {
                var business = item.name;
                //create li for each business name
                var li = $("<li>");
                //add business data - e.g. name
                li.html(business);
                //append to DOM
                $("#results").append(li);
            }
        });
    }

    function loadBusinesses() {
        $.getJSON("food.json", function (response) {
            buildOutput(response);
        })
    }

// load businesses button
    $("#loadBusinesses").click(function (event) {
        event.preventDefault();
        // load all business data...
        loadBusinesses();
    });

// Reset Button
    $("#resetButton").click(function (event) {
        event.preventDefault();
        $('#results').empty();
    });
};
$(document).ready(loadApp);
