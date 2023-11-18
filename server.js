"use strict";

require('dotenv').config();
// Import required modules and variables
const express = require("express");
const http = require("http");
const yelp = require('yelp-fusion');
const jsonApp = express();
const yelpKey = process.env.YelpKey;
const client = yelp.client(yelpKey);
const ipKey = process.env.IpKey;
const ipHost = process.env.IpHost;
const ipUrl = process.env.IpUrl;
const recipeKey = process.env.RecipeKey;
let page = 1; // Track the current page
const resultsPerPage = 36; // Number of results per page

jsonApp.use(express.static(__dirname + "/app"));

http.createServer(jsonApp).listen(3030);

// Define a route handler for /application.json
jsonApp.get("/application.json", function (req, res) {
    handleApplicationRequest(res);
});

// Define a route handler for /bars.json
jsonApp.get("/bars.json", function (req, res) {
    handleApplicationRequest2(res);
});

/*Random search recipes on page start router*/
jsonApp.get("/api/searchRecipe", function (req, res) {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=${resultsPerPage}&offset=${(page - 1) * resultsPerPage}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': recipeKey,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error: "Internal Server Error"});
        });
});

/*Search bar recipe router*/
jsonApp.get(`/api/searchRecipes`, async function (req, res) {
    try {
        const recipeQuery = req.query.query;
        if (!recipeQuery) {
            return res.status(400).json({error: "Recipe query is required."});
        }
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${encodeURIComponent(recipeQuery)}&instructionsRequired=true&fillIngredients=false&addRecipeInformation=true&ignorePantry=true&limitLicense=false&ranking=2&number=${resultsPerPage}&offset=${(page - 1) * resultsPerPage}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': recipeKey,
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            }
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Spoonacular API Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/*Handler for restaurants near your current location*/
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

/*Gets IP from API and returns to handler*/
async function ipFunct() {
    const fetch = (await import('node-fetch')).default;
    const url = ipUrl;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': ipKey,
            ipHost
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

/*Second handler to return location for bars at a specific location, still needs work*/
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

//Keeping in case needed for future use

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

jsonApp.get("/api/searchRecipe", function (req, res) {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?maxReadyTime=20&number=10`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': recipeKey,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error: "Internal Server Error"});
        });
});



