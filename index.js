const express = require("express");
const app = express();
var ownerslogin = require("./ownerslogin");
var customerslogin = require("./customerslogin");
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const ownerlanding = require("./ownerlanding");
const addrestaurant = require("./addrestaurant");
const editrestaurant = require("./editrestaurant");

app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);
app.use("/ownerlanding", ownerlanding);
app.use("/addrestaurant", addrestaurant);
app.use("/editrestaurant", editrestaurant);

app.listen(3000, () => {
  console.log("listening on Port 3000");
});
