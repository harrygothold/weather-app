const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/aac1375d73edcbb2f97fb975c0347d14/${lat},${lng}`,
        json: true  
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperate: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
        
    });    
};

module.exports.getWeather = getWeather;

