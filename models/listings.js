const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review'); // Assuming you have a Review model defined in review.js
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
       url : String,
       filename : String,
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
    contact: {
        type: String,
        default: '+91 1234567890'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;