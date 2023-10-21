"use strict";

ipFunct();

var ip;

async function ipFunct() {
    const url = 'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a2eb59a3a5msha082d86bf50568bp10e897jsn2845f3101d32',
            'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse JSON directly
        console.log(result);
        ip = result;
        console.log(ip);
        let latitude = ip.location.latitude;
        let longitude = ip.location.longitude;

        console.log('Longitude: ' + ip.location.longitude);
        console.log('Latitude: ' + ip.location.latitude);
        console.log('Zip Code: ' + ip.postcode);
        console.log('City: ' + ip.city.name);
        console.log("This is the Latitude: " + latitude);

        return {latitude, longitude};
    } catch (error) {
        console.error(error);
    }

}


/* a simple Express server for Node.js
   comp 424 - yelp test
*/

var express = require("express"),
    http = require("http"),
    jsonApp = express();

const yelp = require('yelp-fusion');
// Place holder for Yelp Fusion's API Key
const apiKey = "qrnFF_krm4u_WK6q5nlQnLT53aUn3y4MaVfT4SQ69eyU3Y6dS4jU8B6ocT9tXV91bWUy5v7QIWhDdcx-KhXKcAeaebHR08in3Oehh3stAQ9LcIvfe4-vZSiHX5svZXYx";
const client = yelp.client(apiKey);

jsonApp.use(express.static(__dirname + "/app"));

http.createServer(jsonApp).listen(3030);

// Search for food
const searchRequest = {
    term: 'restaurants',
    location: 'Logan Square, Edgewater, Chicago, IL',
    price: '1'
};

// Search for bars
const searchRequest2 = {
    term: 'bars',
    location: 'Logan Square, Edgewater, Chicago, IL',
    price: '1'
};

// Search by latitude and longitude
const searchRequest3 = {
    latitude: 41.8972,
    longitude: -87.6196,
};


// Create a new function to make the Yelp API request
async function searchYelp(latitude, longitude) {
    const searchRequest3 = {
        latitude: latitude,
        longitude: longitude,
    };
}


/*jsonApp.get("/food.json", function (req, res) {
    client.search(searchRequest).then(response => {
        res.json(response.jsonBody);
    }).catch(e => {
        console.log(e);
    });
});

jsonApp.get("/bars.json", function (req, res) {
    client.search(searchRequest2).then(response => {
        res.json(response.jsonBody);
    }).catch(e => {
        console.log(e);
    });
});*/

jsonApp.get("/application.json", function (req, res) {
    client.search(searchRequest3).then(response => {
        res.json(response.jsonBody);
    }).catch(e => {
        console.log(e);
    });
});

