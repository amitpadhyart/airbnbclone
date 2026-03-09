const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./UTILS/wrapasync');
const ExpressError = require('./UTILS/ExpressError');
const Review = require('./models/review');
const listings = require('./routes/listing.js')
const reviews = require('./routes/review.js')



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


app.use('/listings', listings)
app.use('/listings/:id/reviews', reviews)





app.all('/{*path}', (req, res, next) => {
    next(new ExpressError( 404, 'Page Not Found'))
})

app.use((err, req, res, next) => {
   let { status = 500, message = 'Something went wrong' } = err;
  res.render('error.ejs', { status, message });
  console.log(err)
})
// --- SERVER START ---

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});