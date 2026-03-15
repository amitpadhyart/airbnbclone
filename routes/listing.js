const express = require('express');
const router = express.Router();
const wrapAsync = require('../UTILS/wrapasync');
const Listing = require('../models/listing');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer')
const {storage} = require('../cloudconfig.js')
const upload = multer({storage})


router.route('/')
    .get(listingController.index)
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.postListing));
        
router.get('/new', isLoggedIn, listingController.renderNewForm);

router.route('/:id')
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, listingController.deleteListing);

router.get('/:id/edit', isLoggedIn, isOwner, listingController.editListing);

module.exports = router;