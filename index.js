const express = require('express')
const app = express()
const keys = require('./config/keys.js')

//allows express access to static files in 'public' folder
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
//setting view engine with ejs markup
app.set('view engine', 'ejs')


app.get('/', function(req,res) {
    res.render('index')
})

app.listen(3000,function() {
    console.log('App running on port 3000')
})



    