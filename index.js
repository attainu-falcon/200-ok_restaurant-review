require("dotenv").config();
const express = require("express");
const app = express();
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
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

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
