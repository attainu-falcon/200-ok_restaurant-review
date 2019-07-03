const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const db = req.app.locals.db;
  db.collection("restaurants")
    .find()
    .sort({ avgRating: -1 })
    .toArray((err, result) => {
      if (err) throw err;
      res.render("customerhome", {
        title: "Home",
        assets: "customerhome",
        navlink: "Shahrukh",
        option1: "Logout",
        navadd1: "/logout",
        data: result
      });
    });
});

module.exports = router;
