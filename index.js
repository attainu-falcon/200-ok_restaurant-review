
// var express = require('express');
// var hbs = require('express-handlebars');
// var path = require('path');
// var app = express();
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var mongoClient = require("mongodb").MongoClient;

// var url;
// if (process.env.MYdb)
//    url = process.env.MYdb
//    else
//    url = "mongodb://127.0.0.1:27017"

//    console.log(url);

//    mongoClient.connect(url, function(err, client){
//     if(err) throw err;
//     app.locals.db = client.db("tableHopper");
// })


// var ownerslogin = require('./ownerslogin');

// var customerslogin = require('./customerslogin');

// app.engine('handlebars', hbs({defaultLayout: "main"}));

// app.set('view engine', 'handlebars');

// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static('public'));

// app.use(session({
//     secret : "Express session secret!"
// }));

// app.use(bodyParser.urlencoded());

// app.use('/ownerslogin', ownerslogin);

// app.use('/', customerslogin);

// var port = process.env.PORT || "8000";

// app.listen(port);

require("dotenv").config();
const express = require("express");
const app = express();
const ownerslogin = require("./ownerslogin");
const customerslogin = require("./customerslogin");
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const ownerhome = require("./ownerhome");
const addrestaurant = require("./addrestaurant");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mongoClient = require("mongodb").MongoClient;

// var url = process.env.MY_DB;

// mongoClient.connect(url, (err, client) => {
//   if (err) throw err;
//   app.locals.db = client.db("tableHopper");
// });
var url;
if (process.env.MYdb)
   url = process.env.MYdb
   else
   url = "mongodb://127.0.0.1:27017"

   console.log(url);

   mongoClient.connect(url, function(err, client){
    if(err) throw err;
    app.locals.db = client.db("tableHopper");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "Express session secret!"
  })
);

app.locals.loggedin;
app.locals.username;
app.locals.ownerloggedin;
app.locals.ownerusername;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/ownerslogin", ownerslogin);
app.use("/", customerslogin);
app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);
app.use("/ownerhome", ownerhome);
app.use("/addrestaurant", addrestaurant);

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

