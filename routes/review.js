const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../UTILS/wrapasync');
const {reviewSchema} = require('../schema');
const ExpressError = require('../UTILS/ExpressError');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require('../controllers/review.js');
const review = require('../models/review.js');


//Reviews
router.post('/', isLoggedIn, validateReview, wrapAsync, reviewController.createReviews)

//DELETE revoiew route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync, reviewController.deleteReviews)

module.exports = router;