const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../UTILS/wrapasync');
const {reviewSchema} = require('../schema');
const ExpressError = require('../UTILS/ExpressError');
const Listing = require('../models/listing');
const Review = require('../models/review');



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // use .validate(), not .validateAsync()
    if (error) {
        throw new ExpressError(400, error.details.map(d => d.message).join(', '));
    } else {
        next();
    }
};

//Reviews
router.post('/', validateReview, wrapAsync( async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new Review Saved")
    res.redirect(`/listings/${listing._id}`);

    }))

//DELETE revoiew route

router.delete('/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); 
   await Review.findByIdAndDelete(reviewId);

   res.redirect(`/listings/${id}`);
}))


module.exports = router;