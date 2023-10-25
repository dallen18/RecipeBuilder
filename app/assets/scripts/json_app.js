//load main app logic
function loadApp() {
    "use strict";

    //loads yelp approved images and matches it to business' ratings

    const starImages = {
        0: 'img/yelp_stars/web_and_ios/regular/regular_0@2x.png',
        0.1: 'img/yelp_stars/web_and_ios/regular/regular_0@2x.png',
        0.2: 'img/yelp_stars/web_and_ios/regular/regular_0@2x.png',
        0.3: 'img/yelp_stars/web_and_ios/regular/regular_0@2x.png',
        0.4: 'img/yelp_stars/web_and_ios/regular/regular_0@2x.png',
        0.5: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        0.6: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        0.7: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        0.8: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        0.9: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        1: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        1.1: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        1.2: 'img/yelp_stars/web_and_ios/regular/regular_1@2x.png',
        1.3: 'img/yelp_stars/web_and_ios/regular/regular_1_half@2x.png',
        1.4: 'img/yelp_stars/web_and_ios/regular/regular_1_half@2x.png',
        1.5: 'img/yelp_stars/web_and_ios/regular/regular_1_half@2x.png',
        1.6: 'img/yelp_stars/web_and_ios/regular/regular_1_half@2x.png',
        1.7: 'img/yelp_stars/web_and_ios/regular/regular_2@2x.png',
        1.8: 'img/yelp_stars/web_and_ios/regular/regular_2@2x.png',
        1.9: 'img/yelp_stars/web_and_ios/regular/regular_2@2x.png',
        2: 'img/yelp_stars/web_and_ios/regular/regular_2@2x.png',
        2.1: 'img/yelp_stars/web_and_ios/regular/regular_2@2x.png',
        2.2: 'img/yelp_stars/web_and_ios/regular/regular_2@2x.png',
        2.3: 'img/yelp_stars/web_and_ios/regular/regular_2_half@2x.png',
        2.4: 'img/yelp_stars/web_and_ios/regular/regular_2_half@2x.png',
        2.5: 'img/yelp_stars/web_and_ios/regular/regular_2_half@2x.png',
        2.6: 'img/yelp_stars/web_and_ios/regular/regular_2_half@2x.png',
        2.7: 'img/yelp_stars/web_and_ios/regular/regular_3@2x.png',
        2.8: 'img/yelp_stars/web_and_ios/regular/regular_3@2x.png',
        2.9: 'img/yelp_stars/web_and_ios/regular/regular_3@2x.png',
        3: 'img/yelp_stars/web_and_ios/regular/regular_3@2x.png',
        3.1: 'img/yelp_stars/web_and_ios/regular/regular_3@2x.png',
        3.2: 'img/yelp_stars/web_and_ios/regular/regular_3@2x.png',
        3.3: 'img/yelp_stars/web_and_ios/regular/regular_3_half@2x.png',
        3.4: 'img/yelp_stars/web_and_ios/regular/regular_3_half@2x.png',
        3.5: 'img/yelp_stars/web_and_ios/regular/regular_3_half@2x.png',
        3.6: 'img/yelp_stars/web_and_ios/regular/regular_3_half@2x.png',
        3.7: 'img/yelp_stars/web_and_ios/regular/regular_4@2x.png',
        3.8: 'img/yelp_stars/web_and_ios/regular/regular_4@2x.png',
        3.9: 'img/yelp_stars/web_and_ios/regular/regular_4@2x.png',
        4: 'img/yelp_stars/web_and_ios/regular/regular_4@2x.png',
        4.1: 'img/yelp_stars/web_and_ios/regular/regular_4@2x.png',
        4.2: 'img/yelp_stars/web_and_ios/regular/regular_4@2x.png',
        4.3: 'img/yelp_stars/web_and_ios/regular/regular_4_half@2x.png',
        4.4: 'img/yelp_stars/web_and_ios/regular/regular_4_half@2x.png',
        4.5: 'img/yelp_stars/web_and_ios/regular/regular_4_half@2x.png',
        4.6: 'img/yelp_stars/web_and_ios/regular/regular_4_half@2x.png',
        4.7: 'img/yelp_stars/web_and_ios/regular/regular_5@2x.png',
        4.8: 'img/yelp_stars/web_and_ios/regular/regular_5@2x.png',
        4.9: 'img/yelp_stars/web_and_ios/regular/regular_5@2x.png',
        5: 'img/yelp_stars/web_and_ios/regular/regular_5@2x.png',
    };

// Function to display Yelp data
    function buildOutput(response) {
        var $yelpResults = response.businesses;

        var imageContainer = $("<div>");
        imageContainer.addClass("image-container");
        imageContainer.css("display", "flex");
        imageContainer.css("flex-direction", "row");
        imageContainer.css("overflow-x", "auto");
        imageContainer.css("white-space", "nowrap");

        //Assigns JSON data to variables
        $yelpResults.forEach(function (item) {
            if (item !== null) {
                var business = item.name;
                var imageUrl = item.image_url;
                var number = item.display_phone;
                var address1 = item.location.display_address[0];
                var address2 = item.location.display_address[1];
                var price = item.price;
                var rating = item.rating;
                var review_count = item.review_count;
                var full_address = address1 + ", " + address2;
                var url = item.url;

                //Creates a business div
                var businessDiv = $("<div>");
                businessDiv.addClass("business-item");
                businessDiv.css("display", "grid");
                businessDiv.css("grid-template-rows", "auto auto auto auto"); // Create rows for each element
                businessDiv.css("justify-content", "center");
                businessDiv.css("align-items", "center");
                businessDiv.css("margin", "10px");
                businessDiv.css("font-size", "22px");
                businessDiv.text(business);

                //Creates image tag
                var img = $("<img>");
                img.attr("src", imageUrl);
                img.attr("width", "340");
                img.attr("height", "270");
                img.css("border", "1px solid black");

                //Creates link to yelp business page
                var link = $("<a>");
                link.attr("href", url);
                link.attr("target", "_blank");
                link.append(img);

                //Creates div for address
                var addressDiv = $("<div>");
                addressDiv.css("font-size", "16px");
                addressDiv.text(full_address);

                //Creates div for business details
                var detailsDiv = $("<div>");
                detailsDiv.css("font-size", "16px");
                detailsDiv.text(`Phone: ${number}   Price: ${price} `);

                // Create a div for the star rating
                var starRatingDiv = $("<div>");
                starRatingDiv.css("display", "flex");
                starRatingDiv.css("align-items", "center");
                starRatingDiv.css("justify-content", "left");
                starRatingDiv.css("margin-bottom", "10px");

                // Display star rating using star sprite image
                var starRating = rating;
                if (starRating >= 0 && starRating <= 5) {
                    var starImage = $("<img>");
                    starImage.attr("src", starImages[starRating]);
                    starImage.attr("width", "204");
                    starImage.attr("height", "36");

                    // Create a <div> for the reviews
                    var reviewsDiv = $("<div>");
                    reviewsDiv.css("font-size", "16px");
                    reviewsDiv.css("justify-content", "right");
                    reviewsDiv.css("padding-left", "25px");
                    reviewsDiv.text(`Reviews: ${review_count}`);

                    // Append the star image and reviews to the starRatingDiv
                    starRatingDiv.append(starImage);
                    starRatingDiv.append(reviewsDiv);
                }

                //Appends everything to image container
                businessDiv.append(link);
                businessDiv.append(addressDiv);
                businessDiv.append(detailsDiv);
                businessDiv.append(starRatingDiv);
                imageContainer.append(businessDiv);
            }
        });

        //Appends container to html id results
        $("#results").append(imageContainer);
    }

    //Receives JSON from business in your location
    function loadBusinesses() {
        $.getJSON("application.json", function (response) {
            buildOutput(response);
        });
    }

    //Receives JSON from bars in the local area
    function loadBars() {
        $.getJSON("bars.json", function (response) {
            buildOutput(response);
        });
    }


    // Call loadBusinesses and loadBars when the document is ready
    $(document).ready(function () {
        loadBusinesses();
        loadBars();
    });

}

$(document).ready(loadApp);




