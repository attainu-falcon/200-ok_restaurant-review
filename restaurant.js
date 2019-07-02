const express = require("express");
const router = express.Router();

router.get("/1", (req, res) => {
  res.send("Welcome to Restaurant 1 Page");
});

router.get("/2", (req, res) => {
  res.send("Welcome to Restaurant 2 Page");
});

router.get("/3", (req, res) => {
  res.send("Welcome to Restaurant 3 Page");
});

router.get("/4", (req, res) => {
  res.send("Welcome to Restaurant 4 Page");
});

module.exports = router;
