require("dotenv").config();
const express = require("express");
const app = express();
const ownerslogin = require("./ownerslogin");
const customerslogin = require("./customerslogin");
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const ownerlanding = require("./ownerlanding");
const addrestaurant = require("./addrestaurant");

const exphbs = require("express-handlebars");
const mongoClient = require("mongodb").MongoClient;

var url = process.env.MY_DB;

mongoClient.connect(url, (err, client) => {
  if (err) throw err;
  app.locals.db = client.db("tableHopper");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/ownerslogin", ownerslogin);
app.use("/customerslogin", customerslogin);
app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);
app.use("/ownerlanding", ownerlanding);
app.use("/addrestaurant", addrestaurant);

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
