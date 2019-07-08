var express = require("express");
var router = express.Router();

router.get("/login", function(request, response) {
  response.render("login1", {
    title: "Login",
    assets: "style",
    navlink: "Login as Restaurant Owner",
    option1: "Login as Customer",
    navadd1: "/"
  });
});

router.get("/signup", function(request, response) {
  response.render("signup1", {
    title: "SignUp",
    assets: "style",
    navlink: "Login as Restaurant Owner",
    option1: "Login as Customer",
    navadd1: "/"
  });
});

router.get("/forget", function(request, response) {
  response.render("forget1", {
    title: "Reset Password",
    assets: "style",
    navlink: "Login as Restaurant Owner",
    option1: "Login as Customer",
    navadd1: "/"
  });
});

router.post("/forget", function(request, response) {
  var db = request.app.locals.db;
  db.collection("ownersLoginData")
    .find()
    .toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          request.body.username === result[i].username &&
          request.body.securityques === result[i].securityques
        ) {
          db.collection("ownersLoginData").updateOne(
            { username: request.body.username },
            { $set: { password: request.body.password } }
          );
        }
      }
      response.redirect("/ownerslogin/login");
    });
});

router.post("/signup", function(request, response) {
  var db = request.app.locals.db;
  db.collection("ownersLoginData").insert(request.body);
  response.redirect("/ownerslogin/login");
});

router.post("/auth", function(request, response) {
  var db = request.app.locals.db;
  db.collection("ownersLoginData")
    .find()
    .toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          request.body.username === result[i].username &&
          request.body.password === result[i].password
        ) {
          request.session.ownerloggedin = true;
          request.app.locals.ownerloggedin = request.session.ownerloggedin;
          request.session.ownerusername = result[i].username;
          request.app.locals.ownerusername = request.session.ownerusername;
        }
      }
      response.redirect("/ownerlanding");
    });
});

router.get("/logout", function(request, response) {
  request.session.destroy();
  request.app.locals.loggedin = false;
  req.app.locals.ownerusername = "";
  response.redirect("/ownerslogin/login");
});

module.exports = router;
