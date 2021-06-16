var express = require('express');
var router = express.Router();
let pageController = require('../controllers/pageController');
let  AuthController = require('../controllers/authController');
var passport = require('passport');
let mypages = new pageController();
const Auth = require('../controllers/authController');
var auth = new Auth();
/* Auth. */
router.post('/sessionlogin', (req, res) => passport.authenticate('local-signin', { successRedirect: '/', failureRedirect: '/login', })(req, res));

router.get('/login',auth.login );
router.get('/register', auth.register );

router.get('/logout', auth.logout);

// Dashboard
router.get('/',auth.ensureAuthenticated,mypages.posts);
router.get('/feeds',auth.ensureAuthenticated,mypages.feeds);
router.get('/mypage',auth.ensureAuthenticated,mypages.mypage);
router.get('/explore',auth.ensureAuthenticated,mypages.explore);
router.get('/chat',auth.ensureAuthenticated,mypages.chat);

router.get('/error',mypages.error)

module.exports = router;
