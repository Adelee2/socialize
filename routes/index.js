var express = require('express');
var router = express.Router();
let pageController = require('../controllers/pageController');
let  AuthController = require('../controllers/authController');
var passport = require('passport');
let mypages = new pageController();
let auth = new AuthController();
/* Auth. */
router.get('/login',auth.login );
router.get('/register', auth.register );
router.post('/login',passport.authenticate('local-signin', { 
    successRedirect: '/',
    failureRedirect: '/login'
    }));
router.post('/register',passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/register'
    }) );

router.get('/logout', auth.logout);

// router.get('/login-google',passport.authenticate('google-signin', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//     }))
// router.get('/register-google',passport.authenticate('google-signup', {
//     successRedirect: '/login',
//     failureRedirect: '/register'
//     }))
// Dashboard
router.get('/',mypages.posts);
router.get('/feeds',mypages.feeds);
router.get('/mypage',mypages.mypage);
router.get('/explore',mypages.explore);
router.get('/chat',mypages.chat);

router.get('/error',mypages.error)

module.exports = router;
