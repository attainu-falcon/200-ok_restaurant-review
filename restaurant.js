const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
var reviews;
var resId;

router.get("/:id", (req, res) => {
  resId = req.params.id;
  var db = req.app.locals.db;
  db.collection("reviews")
    .find({ resId: req.params.id })
    .toArray((err, result) => {
      if (err) throw err;
      reviews = result;
    });
  db.collection("restaurants")
    .find({ _id: ObjectId(req.params.id) })
    .toArray((err, result) => {
      if (err) throw err;
      res.render("restaurant", {
        title: "Restaurant",
        assets: "restaurant",
        logolink: "/customerhome",
        navlink: "Shahrukh",
        option1: "Home",
        option2: "Logout",
        navadd1: "/customerhome",
        data: result,
        reviewData: reviews
      });
    });
});

router.post("/reviews", (req, res) => {
  var db = req.app.locals.db;
  db.collection("reviews").insert({
    rating: req.body.rating,
    review: req.body.review,
    photo: req.body.photo,
    resId: resId,
    username: "Shahrukh"
  });

  res.redirect("/restaurant/" + resId);
});

module.exports = router;
