const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const path = require('path');
const { isLoggedIn,isReviewOwner } = require('../utils/middleware');
const Controller = require('../controller/review');

// Route to create a new review for a listing
router.post('/',isLoggedIn,  wrapAsync(Controller.createNewReview));

// Route to delete a review from a listing
router.delete('/:reviewId',isLoggedIn, isReviewOwner, wrapAsync(Controller.deleteReview));

module.exports = router;