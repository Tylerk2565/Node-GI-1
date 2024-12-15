const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=3de945378aaeff24c4d6636d4e484612&query=' + encodeURIComponent(latitude)+ ',' + encodeURIComponent(longitude);

    // Makes a request to weatherstack and handles errors
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + 'degrees.');
        }
    })
}

module.exports = forecast;