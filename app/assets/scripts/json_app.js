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
        $.getJSON("application.json", function (response) {
            buildOutput(response);
        });
    }

    // Call loadBusinesses when the document is ready
    $(document).ready(function () {
        loadBusinesses();
    });

    // Event handler for the "reset" button
    $("#resetButton").click(function (event) {
        event.preventDefault();
        $('#results').empty();
    });
}

$(document).ready(loadApp);




