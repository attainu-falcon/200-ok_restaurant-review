const express = require("express");
const app = express();
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const exphbs = require("express-handlebars");
const mongoClient = require("mongodb").MongoClient;

mongoClient.connect(
  "mongodb+srv://shahrukh:shah123@cluster0-guil1.mongodb.net/test?retryWrites=true&w=majority",
  (err, client) => {
    if (err) throw err;
    app.locals.db = client.db("tableHopper");
  }
);

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
