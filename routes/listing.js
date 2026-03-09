const express = require('express');
const router = express.Router();
const wrapAsync = require('../UTILS/wrapasync');
const {listingSchema} = require('../schema');
const ExpressError = require('../UTILS/ExpressError');
const Listing = require('../models/listing');






const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body); // use .validate(), not .validateAsync()
    if (error) {
        throw new ExpressError(400, error.details.map(d => d.message).join(', '));
    } else {
        next();
    }
};


// Index Route: Get all listings
router.get('/', async (req, res) => {
    try {
        let allListing = await Listing.find({});
        res.render('./listings/index.ejs', { allListing });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching listings');
    }
});

// New Route: Render form to create a new listing
// Note: This must come BEFORE the Show route so 'new' isn't treated as an :id
router.get('/new', (req, res) => {
    res.render('listings/new.ejs');
});


// Show Route: Display details for one specific listing
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate('reviews');
        if (!listing) return res.status(404).send('Listing not found');
        res.render('listings/show.ejs', { listing });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching listing');
    }
});



// Create Route: Save new listing to database
router.post('/', validateListing, wrapAsync (async (req, res, next) => {
       
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect('/listings');
}));

// Edit Route: Render form to edit an existing listing
router.get('/:id/edit', async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).send('Listing not found');
        res.render('listings/edit.ejs', { listing });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching listing for edit');
    }
});

// Update Route: Apply changes to a specific listing

router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route: Remove a listing from the database
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting listing');
    }
});

module.exports = router;