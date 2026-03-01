const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

// --- MIDDLEWARE & CONFIGURATION ---

// Use ejs-mate for layout/templating engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

// Parse incoming request bodies (for POST/PUT requests)
app.use(express.urlencoded({ extended: true }));

// Allows using PUT/DELETE in forms where only GET/POST are natively supported
app.use(methodOverride('_method'));

// --- DATABASE CONNECTION ---

main()
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/wanderlust');
}

// --- ROUTES ---

// Root Route
app.get('/', (req, res) => {
    res.redirect('/listings');
});

// Index Route: Get all listings
app.get('/listings', async (req, res) => {
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
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

// Create Route: Save new listing to database
app.post('/listings', async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect('/listings');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating listing: ' + err.message);
    }
});

// Show Route: Display details for one specific listing
app.get('/listings/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).send('Listing not found');
        res.render('listings/show.ejs', { listing });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching listing');
    }
});

// Edit Route: Render form to edit an existing listing
app.get('/listings/:id/edit', async (req, res) => {
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
app.put('/listings/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating listing');
    }
});

// Delete Route: Remove a listing from the database
app.delete('/listings/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting listing');
    }
});

// --- SERVER START ---

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});