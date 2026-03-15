const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    try {
        let allListing = await Listing.find({});
        res.render('./listings/index.ejs', { allListing });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching listings');
    }
}


module.exports.renderNewForm = (req, res) => {
    console.log(req.isAuthenticated())
   
    res.render('listings/new.ejs')
}

module.exports.showListing = async (req, res) => {
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
}

module.exports.postListing = (async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename)
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'Successfully made a new listing!');
    res.redirect('/listings');
})

module.exports.editListing = async (req, res) => {
    
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) { req.flash('error', "listing deosnt not exist")
            res.redirect('/listings');
        }
        let originalImage = listing.image.url;
        originalImage =  originalImage.replace('/upload', '/upload/h_300,w_250')
        res.render('listings/edit.ejs', { listing, originalImage });
        }

module.exports.updateListing = (async (req, res) => {
    let { id } = req.params; 
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req !== 'undefined'){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    res.redirect(`/listings/${id}`);
})

module.exports.deleteListing = async (req, res) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting listing');
    }
} 