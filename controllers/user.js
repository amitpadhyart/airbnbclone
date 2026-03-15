const User = require('../models/user.js')

module.exports.renderSignupForm = (req, res) => {
    res.render('user/signup.ejs')
}

module.exports.signup = (async (req, res, next) => {
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
    
        
})


module.exports.renderLoginForm = (req, res) => {
    res.render('user/login.ejs')
}

module.exports.login = async (req, res ) => 
    {
        req.flash('success', 'welcome back')
        let redirectUrl = res.locals.redirectUrl || '/listings';
        console.log(redirectUrl)
        res.redirect(req.session.redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout((err)=>{
        if(err){
            return  next(err)
        }
        req.flash('success', 'you have logged out')
        res.redirect('/listings')
    })
}