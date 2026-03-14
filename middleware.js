const Listing = require('./models/listing');
const { listingSchema, reviewSchema } = require('./schema'); // ✅ import reviewSchema too
const ExpressError = require('./UTILS/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in");
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id); // ✅ pass id
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "you don't have permission to do that"); // ✅ fixed typo
        return res.redirect(`/listings/${id}`);
    }
    next(); // ✅ call next() when user is the owner
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(d => d.message).join(', '));
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // ✅ now imported
    if (error) {
        throw new ExpressError(400, error.details.map(d => d.message).join(', '));
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { revieewId } = req.params;
    let listing = await Review.findById(reviewId); 
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "you don't have permission to do that"); 
        return res.redirect(`/listings/${id}`);
    }
    next(); 
};