var express = require('express');
var app = express();

var ownerslogin = require('./ownerslogin');

var customerslogin = require('./customerslogin');

app.use('/ownerslogin', ownerslogin);

app.use('/customerslogin', customerslogin);

app.listen("3000");