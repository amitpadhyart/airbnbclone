const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../UTILS/wrapasync');
const {reviewSchema} = require('../schema');
const ExpressError = require('../UTILS/ExpressError');
const Listing = require('../models/listing');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');





//Reviews
router.post('/', isLoggedIn, validateReview, wrapAsync( async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id;
    listing.reviews.push(newReview)

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new Review Saved")
    res.redirect(`/listings/${listing._id}`);

    }))

//DELETE revoiew route

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); 
   await Review.findByIdAndDelete(reviewId);

   res.redirect(`/listings/${id}`);
}))


module.exports = router;