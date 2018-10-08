const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=abQiQkkiCAVGvgVjgKGk6muYItoCIFwY&location=${encodedAddress}`,
        json: true
        }, (error, response, body) => {           
    if (error) {
        callback('Unable to connect to MapQuest servers.');
    } else if(body.results[0].locations[0].geocodeQualityCode === 'Z1XAA'){
        callback('Unable to find address');
    } else if (body.results[0].locations[0].geocodeQualityCode === 'L1ABA') {
        callback(undefined, {
            address: body.results[0].providedLocation.location,
            latitude: body.results[0].locations[0].latLng.lat,
            longitude: body.results[0].locations[0].latLng.lng
        });
    }
        });
    };

module.exports = {geocodeAddress};


