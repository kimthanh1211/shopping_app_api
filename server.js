let express = require('express');
let app= express();
const bodyParser = require('body-parser')
require('dotenv').config();
//let port=process.env.Port || 3000
let port=3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
let routes = require('./api/routes') //importing route
routes(app)
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
})
app.listen(port);
console.log('START server  api' ,process.env.PORT);