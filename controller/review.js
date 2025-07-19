const Listing = require('../models/listings');
const Review = require('../models/review');



module.exports.createNewReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);
    review.owner = req.user._id; // Set the owner of the review
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect('/listings');
    }
    req.flash('success', 'Successfully added a new review!');
    res.redirect(`/listings/${id}`);
}


module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if (!id) {
        req.flash("error", "Listing not found");
        return res.redirect('/listings');
    }
    req.flash('success', 'Successfully deleted the review!');
    res.redirect(`/listings/${id}`);
}