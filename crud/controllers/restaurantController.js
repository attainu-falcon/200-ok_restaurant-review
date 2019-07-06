const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');

router.get('/', (req, res) => {
    res.render("restaurant/addoredit", {
        viewTitle: "Insert restaurant"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var restaurant = new Restaurant();
    restaurant.fullName = req.body.fullName;
    restaurant.email = req.body.email;
    restaurant.mobile = req.body.mobile;
    restaurant.city = req.body.city;
    restaurant.save((err, doc) => {
        if (!err)
            res.redirect('restaurant/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("restaurant/addOrEdit", {
                    viewTitle: "Insert restaurant",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Restaurant.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('restaurant/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("restaurant/addOrEdit", {
                    viewTitle: 'Update restaurant',
                    restaurant: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Restaurant.find((err, docs) => {
        if (!err) {
            res.render("restaurant/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving restaurant list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("restaurant/addOrEdit", {
                viewTitle: "Update restaurant",
                restaurant: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Restaurant.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/restaurant/list');
        }
        else { console.log('Error in restaurant delete :' + err); }
    });
});

module.exports = router;