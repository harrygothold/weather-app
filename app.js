const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyDbN9AkAQr0zhfx7zkOIthN5sbubKbnNrs',
    json: true
}, (error, response, body) => {
    console.log(body);
});