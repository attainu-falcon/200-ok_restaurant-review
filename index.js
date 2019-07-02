

//var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
//var app = express();
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



require("dotenv").config();
const express = require("express");
const app = express();
const ownerslogin = require("./ownerslogin");
const customerslogin = require("./customerslogin");
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const ownerlanding = require("./ownerlanding");
const addrestaurant = require("./addrestaurant");



// app.get("/", (req, res) => {
//   res.send("Welcome to Home Page");
// });
=======
// const exphbs = require("express-handlebars");
// const mongoClient = require("mongodb").MongoClient;

// var url = process.env.MY_DB;

// mongoClient.connect(url, (err, client) => {
//   if (err) throw err;
//   app.locals.db = client.db("tableHopper");
// });

// app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
// app.set("view engine", "hbs");

// app.use(express.urlencoded({ extended: false }));

// app.use(express.static("public"));


app.use("/ownerslogin", ownerslogin);
//app.use("/customerslogin", customerslogin);
app.use('/', customerslogin);
app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);
app.use("/ownerlanding", ownerlanding);
app.use("/addrestaurant", addrestaurant);



//var customerslogin = require('./customerslogin');

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

//app.use('/ownerslogin', ownerslogin);



//app.listen(process.env.PORT || "3000");

//app.listen(3000, () => {
 // console.log("listening on Port 3000");

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

});

