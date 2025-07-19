const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveReturnTo } = require('../utils/middleware');


router.get('/signUp', (req, res) => {
    const list = { title: 'Sign Up - MapMyStay' };
    res.render('register', { list });
});
router.post('/signUp', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Welcome to MapMyStay!');
        res.redirect('/listings');
    });

});
router.get('/login', (req, res) => {
    const list = { title: 'Login - MapMyStay' };
    res.render('login', { list });
});

router.post('/login',saveReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login' }), (req, res) => {
    req.flash('success', 'Logged in!');
    res.redirect(res.locals.returnTo || '/listings');
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out!');
        res.redirect('/listings');
    });
});







module.exports = router;




