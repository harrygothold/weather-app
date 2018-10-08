// load request
const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=abQiQkkiCAVGvgVjgKGk6muYItoCIFwY&location=${encodedAddress}`,
            json: true
            }, (error, response, body) => {           
        if (error) {
            reject('Unable to connect to MapQuest servers.');
        } else if(body.results[0].locations[0].geocodeQualityCode === 'Z1XAA'){
            reject('Unable to find address');
        } else if (body.results[0].locations[0].geocodeQualityCode === 'L1ABA') {
            resolve({
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
            });
    });
};

geocodeAddress('19146').then((location) => {
// success handler
console.log(JSON.stringify(location, undefined, 2));
}, (erorrMessage) => {
// error handler
console.log(erorrMessage);
});