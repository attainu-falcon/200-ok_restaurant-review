const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
var reviews;
var resId;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

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
  db.collection("reviews")
    .find({ resId: resId })
    .toArray((err, result) => {
      if (err) throw err;
      var ratingSum = 0;
      var len = result.length;
      for (var i = 0; i < len; i++) {
        ratingSum += parseFloat(result[i].rating);
      }
      var avgRating = ratingSum / len;
      var db = req.app.locals.db;
      db.collection("restaurants").updateOne(
        { _id: ObjectId(resId) },
        { $set: { avgRating: avgRating } }
      );
    });
  res.redirect("/restaurant/" + resId);
});

module.exports = router;
