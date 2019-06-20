const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to edit restaurant page");
});

module.exports = router;