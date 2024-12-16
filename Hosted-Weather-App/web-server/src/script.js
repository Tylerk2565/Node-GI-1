const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

// Home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tyler Krug'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tyler Krug'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Tyler Krug'
    })
})

// Fetching weather data based on address
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    // Geocodes address to get longitude and latitude
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        // Fetches weather forecast using given coordinates
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            // Sends the weather data to client
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


// Handles the product searches
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

// Handles non-existent articles 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tyler Krug',
        errorMessage: 'Help article not found'
    })
})


// Handles any other undefined page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tyler Krug',
        errorMessage: 'Page not found'
    })
})

// Starts server 
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})