const express = require('express');
const bodyParse = require('body-parser')
const keys = require('./config/keys.js');
const fetch = require('node-fetch')

const app = express();

//allows express access to static files in 'public' folder
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
//allows us to access JSON body within the HTML req 
app.use(bodyParse.urlencoded({extended: false}));
//setting view engine with ejs markup
app.set('view engine', 'ejs');



app.get('/', function(req,res) {
    res.render('index', {Weather: null});
});


app.post('/', function(req, res) {
    const format = function capitalizeFirstLetter(string) {
        result = string.toLowerCase()
        result = result.charAt(0).toUpperCase() + result.slice(1);
        return result
    }

    const city = format(req.body.city)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${keys.openweatherapi.apikey}&units=imperial`


    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.main===undefined) {
            const error = `Please enter a correct city`
            res.render('index', {Weather: error})
        }
        else {
            temperature = Math.round(data.main.temp)
            description = data.weather[0].description
            

            const response = `It is currently ${temperature} \u{2109} in ${city}.`
            res.render('index', {Weather: response})
        }
       
        
        
    })
    .catch(error => {
        console.log(error)
    })
        
    
})


app.listen(3000,function() {
    console.log('App running on port 3000');
});


