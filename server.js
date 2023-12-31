let express = require('express');
let app= express();
const bodyParser = require('body-parser')
let port=3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.static('public'));
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
let routes = require('./api/routes'); //importing route
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
})
app.listen(port, ()=>console.log((`Server listening on port: ${port}`)));
console.log('START server  api');// ,process.env.PORT);

const mongodb =require('mongodb');
let token= new mongodb.ObjectId().toString();
console.log("token",token);
