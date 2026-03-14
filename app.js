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
const listingRouter  = require('./routes/listing.js')
const reviewRouter = require('./routes/review.js')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');





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
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true 
    }  

}
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
    console.log(res.locals.success)
    next();
})

// app.get('/demouser', async (req, res) => {
//     let fakeuser = new User({
//         email: "student@gmail.com",
//         username : 'deltaStudent101'

//     })

//     let registeredUser = await User.register(fakeuser, 'helloWORLD' )
//     res.send(registeredUser)
// })


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

app.use('/', require('./routes/user.js'))
app.use('/listings', listingRouter)
app.use('/listings/:id/reviews', reviewRouter)
// app.use('/users', require('./routes/user.js'))





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