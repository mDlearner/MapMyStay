const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/6664684/pexels-photo-6664684.jpeg?cs=srgb&dl=pexels-constanze-marie-6664684.jpg&fm=jpg"
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        default: '+91 1234567890'
    },
});
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;