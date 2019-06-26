const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const db = req.app.locals.db;
  db.collection("restaurants")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.render("customerhome", {
        title: "Home",
        assets: "customerhome",
        navlink: "Shahrukh",
        option1: "Logout",
        data: result
      });
    });
});

module.exports = router;
