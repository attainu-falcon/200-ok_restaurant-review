var express = require("express");
var router = express.Router();


   router.get('/login1', function(request,response){
            response.render('login1',{
            title: "Login",
            assets: "style",
            navlink: "Login as Restaurant Owner",
            option1: "Login as Customer",
            navadd1: "/"
            });
            });

    router.get('/signup1', function(request,response){
            response.render('signup1',{
                title: "SignUp",
                assets: "style",
                navlink: "Login as Restaurant Owner",
            });
            
    });

    router.get('/forget1', function(request,response){
            response.render('forget1',{
                title: "Reset Password",
                assets: "style",
                navlink: "Login as Restaurant Owner",
            });
    })
    
    router.post('/forget1', function(request,response){
            var db = request.app.locals.db;
              db.collection("ownersLoginData").find().toArray(function(err, result){
               if (err) throw err;
                for(var i=0; i < result.length; i++){
                 if(request.body.username === result[i].username && request.body.securityquestion === result[i].securityquestion){
                  request.session.forget1 = true;
                   db.collection("ownersLoginData").update({username: request.body.username}, {$set: {password: request.body.password}})
                     //app.locals.login=request.session.login;
                    request.session.username = result[i].username;
                    }
                }
                response.redirect('/ownerslogin/pass1');
            });
    })
        
    router.get('/pass1', function(request,response){
           if(request.session.forget1 == true){
             response.send('success ' + ' <a href="/ownerslogin/end1">Login page</a>');
           }
            else {
               response.render('forget1');
           }
    })
        
    router.get('/end1', function(request,response){
            request.session.destroy();
             response.redirect('/ownerslogin/login1');
    });



    router.post('/signup1', function(request, response){
            var db = request.app.locals.db;
             db.collection("ownersLoginData").insert(request.body)
              response.send('inserted');
           
    });
        
    router.post('/auth1', function(request,response){
        var db = request.app.locals.db;
           db.collection("ownersLoginData").find().toArray(function(err, result){
            if (err) throw err;
            for(var i=0; i < result.length; i++){
                if(request.body.username === result[i].username && request.body.password === result[i].password){
                 request.session.login1 = true;
                 //app.locals.login=request.session.login;
                 request.session.ownerName = result[i].name;
                }
            }
            response.redirect("/ownerslogin/user1");
        });
        
    })

    router.get('/user1', function(request,response){
        if(request.session.login1 == true){
            response.send("welcome " + request.session.ownerName + ". Do you want to <a  href='/ownerslogin/logout1'>logout1</a>");
        }
       else {
           response.send("you are blocked" + " . Back to the <a  href='/ownerslogin/logout1'>login page</a>");
       }
    })

    router.get('/logout1', function(request,response){
        request.session.destroy();
        response.redirect('/ownerslogin/login1');
    })



module.exports = router;

// router.get("/", function(request, response) {
//   response.send("Welcome to owners page");
// });
// module.exports = router;
