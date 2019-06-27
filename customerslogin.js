var express = require('express');
var router = express.Router();

    router.get('/login', function(request,response){
            response.render('login');
    });

    router.get('/signup', function(request,response){
            response.render('signup');
    });

    router.get('/forget', function(request,response){
            response.render('forget');
    });

    router.post('/forget', function(request,response){
        var db = request.app.locals.db;
            db.collection("customersLoginData").find().toArray(function(err, result){
                if (err) throw err;
                  for(var i=0; i < result.length; i++){
                    if(request.body.username === result[i].username && request.body.securityquestion === result[i].securityquestion){
                     request.session.forget = true;
                     db.collection("customersLoginData").update({username: request.body.username}, {$set: {password: request.body.password}})
                     //app.locals.login=request.session.login;
                     request.session.username = result[i].username;
                    }
                }response.redirect('/customerslogin/pass');
        
            });
    });

    router.get('/pass', function(request,response){
        if(request.session.forget == true){
            response.send('success'  + ' <a href=/customerslogin/end>Login page</a>');
        }
        else {
                response.render('forget');
        }
    })
        
    router.get('/end', function(request,response){
        request.session.destroy();
          response.redirect('/customerslogin/login');
    });

            // router.post('/reset', function(request, response){
            //     var db = request.app.locals.db;
            //     var username = request.body.username;
            //     // var shotgun;
            //     db.collection("customersLoginData").update({username: username}, {$set: {password: request.body.password}}, function(err, result){
            //         if (err) {
            //             console.log('Error updating object: ' + err);
            //             //res.send({'error':'An error has occurred'});
            //             response.render('forget');
               
            //         } else {
                       //console.log('' + result + ' document(s) updated');
            //             response.redirect('/customerslogin/end');
            //         }
            //     });
                   
            // });


    router.post('/signup', function(request, response){
        var db = request.app.locals.db;
          db.collection("customersLoginData").insert(request.body)
           response.send('inserted');
    });
        


    router.post('/auth', function(request,response){
        var db = request.app.locals.db;
           db.collection("customersLoginData").find().toArray(function(err, result){
            if (err) throw err;
            for(var i=0; i < result.length; i++){
                if(request.body.username === result[i].username && request.body.password === result[i].password){
                 request.session.login = true;
                 //app.locals.login=request.session.login;
                 request.session.customerName = result[i].name;
                }
            }
            response.redirect("/customerslogin/user");
        });
        
        
    })
    
    router.get('/user', function(request,response){
        if(request.session.login == true){
            response.send("welcome " + request.session.customerName + ". Do you want to <a  href='/customerslogin/logout'>logout</a>");
        }
       else {
           response.send("you are blocked" + " . Back to the <a  href='/customerslogin/logout'>login page</a>");
       }
    })

    router.get('/logout', function(request,response){
        request.session.destroy();
        response.redirect('/customerslogin/login');
    })

module.exports = router;