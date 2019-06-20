const express = require("express");
const app = express();
const ownerslogin = require("./ownerslogin");
const customerslogin = require("./customerslogin");
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const ownerlanding = require("./ownerlanding");
const addrestaurant = require("./addrestaurant");
const editrestaurant = require("./editrestaurant");

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
app.use("/ownerslogin", ownerslogin);
app.use("/customerslogin", customerslogin);
app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);
app.use("/ownerlanding", ownerlanding);
app.use("/addrestaurant", addrestaurant);
app.use("/editrestaurant", editrestaurant);

app.listen(3000, () => {
  console.log("listening on Port 3000");
});
