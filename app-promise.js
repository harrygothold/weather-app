const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
})
    .help()
    .alias('help', 'h')
    .argv;

    var encodedAddress = encodeURIComponent(argv.address);
    var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=abQiQkkiCAVGvgVjgKGk6muYItoCIFwY&location=${encodedAddress}`;
    axios.get(geocodeUrl).then((response) => {
        if (response.data.body.results[0].locations[0].geocodeQualityCode === 'Z1XAA') {
            throw new Error('Unable to find address');
        }
        var lat = response.data.body.results[0].locations[0].latLng.lat;
        var lng = response.data.body.results[0].locations[0].latLng.lng;
        var weatherUrl = `https://api.darksky.net/forecast/aac1375d73edcbb2f97fb975c0347d14/${lat},${lng}`;
        console.log(response.data.body.results[0].providedLocation.location);
        return axios.get(weatherUrl);
    }).then ((response) => {
        var temperatrue = response.data.currently.temperatrue;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`The temperature is ${temperatrue}. It feels like ${apparentTemperature}`);
    }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API server');
        } else {
            console.log(e.message);
        }
    });





