"use strict";

window.onload = ipFunct();

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

        // Call a function to make the second API call with latitude and longitude
        await makeYelpCall(latitude, longitude);
    } catch (error) {
        console.error(error);
    }
}

async function makeYelpCall(latitude, longitude) {
    const yelpURL = `http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=30000&sort_by=best_match&limit=20`;

    const yelpOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer qrnFF_krm4u_WK6q5nlQnLT53aUn3y4MaVfT4SQ69eyU3Y6dS4jU8B6ocT9tXV91bWUy5v7QIWhDdcx-KhXKcAeaebHR08in3Oehh3stAQ9LcIvfe4-vZSiHX5svZXYx'
        }
    };

    try {
        const response = await fetch(yelpURL, yelpOptions);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

