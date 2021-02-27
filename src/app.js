const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Azizkhon Maksudkhanov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Azizkhon Maksudkhanov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'This is some helpful text',
        name: 'Azizkhon Maksudkhanov'
    })
})

app.get('/help/*', (req, res) => {
    res.render('noarticle', {
        title: '404',
        name: 'Azizkhon Maksudkhanov',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })  
    }

    geocode(req.query.address, (error, {latitude, longtitude, location}={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Azizkhon Maksudkhanov',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is working');
})