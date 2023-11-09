"use strict";

// Import required modules
const express = require("express");
const http = require("http");
const yelp = require('yelp-fusion');

const jsonApp = express();
const apiKey = "qrnFF_krm4u_WK6q5nlQnLT53aUn3y4MaVfT4SQ69eyU3Y6dS4jU8B6ocT9tXV91bWUy5v7QIWhDdcx-KhXKcAeaebHR08in3Oehh3stAQ9LcIvfe4-vZSiHX5svZXYx";
const client = yelp.client(apiKey);


jsonApp.use(express.static(__dirname + "/app"));

http.createServer(jsonApp).listen(3030);

// Define a route handler for /application.json
jsonApp.get("/application.json", function (req, res) {
    handleApplicationRequest(res);
});

jsonApp.get("/bars.json", function (req, res) {
    handleApplicationRequest2(res);
});

async function handleApplicationRequest(res) {
    try {
        const {latitude, longitude} = await ipFunct();
        const searchRequest3 = {
            latitude: latitude,
            longitude: longitude,
        };

        client.search(searchRequest3).then(response => {
            res.json(response.jsonBody);
        }).catch(e => {
            console.log(e);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

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
        const result = await response.json();
        const ip = result;
        const latitude = ip.location.latitude;
        const longitude = ip.location.longitude;
        return {latitude, longitude};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Keeping incase of future use

/*async function ipFunct2() {
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
        const result = await response.json();
        const ip = result;
        const city = ip.city.name;
        return city;
    } catch (error) {
        console.error(error);
        throw error;
    }
}*/

async function handleApplicationRequest2(res) {
    try {
        //const {city} = await ipFunct2(); hardcoded Chicago until further notice
        const searchRequest2 = {
            term: 'bars',
            location: 'Chicago',
            price: '1',
        };
        client.search(searchRequest2).then(response => {
            res.json(response.jsonBody);
        }).catch(e => {
            console.log(e);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




