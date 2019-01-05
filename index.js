const express = require('express');
const https = require('https');
const http = require('http');

const app = express();
const keys = require('./config/keys.js');


//allows express access to static files in 'public' folder
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
//setting view engine with ejs markup
app.set('view engine', 'ejs');


app.get('/', function(req,res) {
    res.render('index');
});

app.get('/weather',function(req, res) {
    //console.log(req)
    console.log('=====================================')
    console.log(req.query.city)    
    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&APPID=${keys.openweatherapi.apikey}`, (res) => {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    })

    res.render('index');

});

// app.post('/', function (req, res) {
//     let city = req.body.city;
//     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
//   request(url, function (err, response, body) {
//       if(err){
//         res.render('index', {weather: null, error: 'Error, please try again'});
//       } else {
//         let weather = JSON.parse(body)
//         if(weather.main == undefined){
//           res.render('index', {weather: null, error: 'Error, please try again'});
//         } else {
//           let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//           res.render('index', {weather: weatherText, error: null});
//         }
//       }
//     });
//   })

//http://api.openweathermap.org/data/2.5/weather?q=Northridge&APPID=9f05687010acbaca1eef78f4fa324467

// Url {
//     protocol: null,rs
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?city=Sunland',
//     query: 'city=Sunland',
//     pathname: '/weather',
//     path: '/weather?city=Sunland',
//     href: '/weather?city=Sunland',
//     _raw: '/weather?city=Sunland' },
//  params: {},
//  query: { city: 'Sunland' },

//https.get(url[, options][, callback])

app.listen(3000,function() {
    console.log('App running on port 3000');
});

    