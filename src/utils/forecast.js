const request = require('request')


const forecast = (latitude, longtitude, callback) => {
    const url =
    'http://api.weatherstack.com/current?access_key=09be6f69e1894a2a8a6e93d197b1feb0&query=' + latitude + ',' + longtitude+'&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0])
        }
    })
}


module.exports = forecast