require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
var fileupload = require("express-fileupload");

require('dotenv').config();


const restaurantController = require('./controllers/restaurantController');

  


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(fileupload());


app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/restaurant', restaurantController);