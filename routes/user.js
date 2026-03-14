const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const wrapAsync = require('../UTILS/wrapasync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware.js');
const {savedRedirectUrl} = require('../middleware.js');



router.get('/signup', (req, res) => {
    res.render('user/signup.ejs')
})

router.post('/signup', wrapAsync (async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'welcome to wanderlust');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/signup')
    }
    
        
}))

router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', passport.authenticate('local', 
    {failureFlash: true, failureRedirect: '/login', 
    keepSessionInfo: true}), async (req, res ) => 
    {
        req.flash('success', 'welcome back')
        let redirectUrl = res.locals.redirectUrl || '/listings';
        console.log(redirectUrl)
        res.redirect(req.session.redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout((err)=>{
        if(err){
            return  next(err)
        }
        req.flash('success', 'you have logged out')
        res.redirect('/listings')
    })
})


module.exports = router;