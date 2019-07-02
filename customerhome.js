const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Customer Home");
});

module.exports = router;
