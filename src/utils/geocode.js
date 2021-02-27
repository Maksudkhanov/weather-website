const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFrc3Vka2hhbm92IiwiYSI6ImNrbDFkYXdyaDB1dG8yb3BldG96YXRkZDIifQ.Mwg3bA93G6KD5lUlUmaSWQ&limit=10'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[1].center[1],
                longtitude: response.body.features[1].center[0],
                location: response.body.features[1].place_name
            })
        }
    })
}

module.exports = geocode