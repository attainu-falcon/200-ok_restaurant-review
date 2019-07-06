

const mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: 'This field is required.'
    },
    restaurantName: {
        type: String
    },
    restaurantSlogan: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
});



mongoose.model('Restaurant', restaurantSchema);