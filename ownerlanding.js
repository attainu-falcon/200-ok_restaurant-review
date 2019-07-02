const express = require("express");
const router = express.Router();

router.get("/",function (req, res){
  res.send("Welcome to  restaurant owner page");
});

module.exports = router;