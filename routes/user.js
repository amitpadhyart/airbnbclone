const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const wrapAsync = require('../UTILS/wrapasync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware.js');
const {savedRedirectUrl} = require('../middleware.js');
const userController = require('../controllers/user.js');

router.route('/signup')
.get( userController.renderSignupForm)
.post(wrapAsync(userController.signup))


router.route('/login')
.get(userController.renderLoginForm)
.post(passport.authenticate('local', 
    {failureFlash: true, failureRedirect: '/login', 
    keepSessionInfo: true}), userController.login)

router.get('/logout', userController.logout)


module.exports = router;