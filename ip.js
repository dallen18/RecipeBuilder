"use strict"
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
        const result = await response.text();
        console.log(result);
        ip = JSON.parse(result);
        console.log(ip);
        let latitude = ip.location.latitude.value;
        let longitude = ip.location.longitude.value;

        console.log('Longitude: ' + ip.location.longitude);
        console.log('Latitude: ' + ip.location.latitude);
        console.log('Zip Code: ' + ip.postcode);
        console.log('City: ' + ip.city.name);

        console.log("This is the Latitude: " + latitude);

    } catch (error) {
        console.error(error);
    }
}

