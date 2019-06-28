var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
    if(err) throw err;
    app.locals.db = client.db("tableHopper");
})


var ownerslogin = require('./ownerslogin');

var customerslogin = require('./customerslogin');

//app.use('/static', express.static('public'));
app.engine('handlebars', hbs({defaultLayout: "main"}));

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

//views for owner
// app.engine('handlebars', hbs({defaultLayout: "main"}));

// app.set('view engine', 'handlebars');

// app.set('views1', path.join(__dirname, 'viewsowner'));

// app.use(express.static('public'));

app.use(session({
    secret : "Express session secret!"
}));

app.use(bodyParser.urlencoded());

app.use('/ownerslogin', ownerslogin);

app.use('/customerslogin', customerslogin);

app.listen(process.env.PORT || "3000");