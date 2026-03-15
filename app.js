const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
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
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');



const dbUrl = process.env.ATLAS_DB;

main()
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}


// --- MIDDLEWARE & CONFIGURATION ---

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    console.log(res.locals.success);
    next();
});


// --- ROUTES ---

app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.use('/', require('./routes/user.js'));
app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);

app.all('/{*path}', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    let { status = 500, message = 'Something went wrong' } = err;
    res.render('error.ejs', { status, message });
    console.log(err);
});


// --- SERVER START ---

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});