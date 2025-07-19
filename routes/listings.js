const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listings');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const listingSchema = require('../validateList');
const path = require('path');
const { isLoggedIn, isOwner } = require('../utils/middleware');
const Controller = require('../controller/listings');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudConfig');
const upload = multer({storage});

// Joi validation middleware for listings
const validateListings = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

// Home page route for listings
router.route('/')
.get(wrapAsync(Controller.home))
// Create new listing
.post(isLoggedIn, upload.single('listing[image]'),validateListings, wrapAsync(Controller.newListing));



// Render new listing form
router.get('/new', isLoggedIn, Controller.renderNewForm );

// Render edit listing form
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(Controller.renderEditForm));

// Show single listing with reviews
router.get('/:id', wrapAsync(Controller.viewListing));


// Update listing
router.put('/:id', isLoggedIn, isOwner, upload.single('listing[image]'), validateListings, wrapAsync(Controller.updateListing));
// Delete listing
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(Controller.deleteListing));

module.exports = router;