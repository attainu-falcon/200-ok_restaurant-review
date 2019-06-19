var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
    response.send('welcome to customers page');

})

module.exports = router;