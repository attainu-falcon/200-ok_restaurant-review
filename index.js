const express = require("express");
const app = express();
var ownerslogin = require('./ownerslogin');
var customerslogin = require('./customerslogin');
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
app.use('/ownerslogin', ownerslogin);
app.use('/customerslogin', customerslogin);
app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);

app.listen(3000, () => {
  console.log("listening on Port 3000");
});
