const express = require('express');
const router = express.Router();
const wrapAsync = require('../UTILS/wrapasync');
const {listingSchema} = require('../schema');
const ExpressError = require('../UTILS/ExpressError');
const Listing = require('../models/listing');
const { isLoggedIn, isOwner } = require('../middleware.js');
const {validateListing} = require('../middleware.js');









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

router.get('/new', isLoggedIn, (req, res) => {
    console.log(req.isAuthenticated())
   
    res.render('listings/new.ejs')
});


// Show Route: Display details for one specific listing
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate({path:'reviews', populate:{path:'author'}}).populate('owner');
        if (!listing) {
            req.flash('error', 'Cannot find that listing!');
            return res.redirect('/listings');
        }
        console.log(listing)
        res.render('listings/show.ejs', { listing });
    } catch (err) {
       
        res.status(500).send('Error fetching listing');
    }
}); 



// Create Route: Save new listing to database
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Successfully made a new listing!');
    res.redirect('/listings');
}));

// Edit Route: Render form to edit an existing listing
router.get('/:id/edit', isLoggedIn, isOwner, async (req, res) => {
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

router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params; 
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route: Remove a listing from the database
router.delete('/:id', isLoggedIn, isOwner, async (req, res) => {
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