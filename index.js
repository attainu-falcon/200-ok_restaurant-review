var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoClient = require("mongodb").MongoClient;

var url;
if (process.env.MYdb)
   url = process.env.MYdb
   else
   url = "mongodb://127.0.0.1:27017"

   console.log(url);

   mongoClient.connect(url, function(err, client){
    if(err) throw err;
    app.locals.db = client.db("tableHopper");
})


var ownerslogin = require('./ownerslogin');

var customerslogin = require('./customerslogin');

app.engine('handlebars', hbs({defaultLayout: "main"}));

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(session({
    secret : "Express session secret!"
}));

app.use(bodyParser.urlencoded());

app.use('/ownerslogin', ownerslogin);

app.use('/', customerslogin);

var port = process.env.PORT || "8000";

app.listen(port);