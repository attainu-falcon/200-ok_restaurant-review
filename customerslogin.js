var express = require("express");
var router = express.Router();

router.get("/", function(request, response) {
  response.render("login", {
    title: "Login",
    assets: "style",
    navlink: "Login as Customer",
    option1: "Login as Restaurant Owner",
    navadd1: "/ownerslogin/login"
  });
});

router.get("/signup", function(request, response) {
  response.render("signup", {
    title: "SignUp",
    assets: "style",
    navlink: "Login as Customer",
    option1: "Login as Restaurant Owner",
    navadd1: "/ownerslogin/login"
  });
});

router.get("/forget", function(request, response) {
  response.render("forget", {
    title: "Reset Password",
    assets: "style",
    navlink: "Login as Customer",
    option1: "Login as Restaurant Owner",
    navadd1: "/ownerslogin/login"
  });
});

router.post("/forget", function(request, response) {
  var db = request.app.locals.db;
  db.collection("customersLoginData")
    .find()
    .toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          request.body.username === result[i].username &&
          request.body.securityques === result[i].securityques
        ) {
          db.collection("customersLoginData").updateOne(
            { username: request.body.username },
            { $set: { password: request.body.password } }
          );
        }
      }
      response.redirect("/");
    });
});

router.post("/signup", function(request, response) {
  var db = request.app.locals.db;
  db.collection("customersLoginData").insert(request.body);
  response.redirect("/");
});

router.post("/auth", function(request, response) {
  var db = request.app.locals.db;
  db.collection("customersLoginData")
    .find()
    .toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          request.body.username === result[i].username &&
          request.body.password === result[i].password
        ) {
          request.session.loggedin = true;
          request.app.locals.loggedin = request.session.loggedin;
          request.session.username = result[i].username;
          request.app.locals.username = request.session.username;
        }
      }
      response.redirect("/customerhome");
    });
});

router.get("/logout", function(request, response) {
  request.session.destroy();
  request.app.locals.loggedin = false;
  response.redirect("/");
});

module.exports = router;
