var express = require('express');
var router = express.Router();
let pageController = require('../controllers/pageController');
var passport = require('passport');
let mypages = new pageController();
const Auth = require('../controllers/authController');
const Posts = require('../controllers/utils/Posts');
var auth = new Auth();


// var postutils = new Posts()
/* Auth. */
router.post('/sessionlogin', (req, res) => passport.authenticate('local-signin', { successRedirect: '/', failureRedirect: '/login', })(req, res));

router.get('/login',auth.login );
router.get('/register', auth.register );
router.post('/sessionregister',auth.sessionregister);
router.get('/logout', auth.logout);

// Dashboard
router.get('/',auth.ensureAuthenticated,mypages.posts);
router.get('/feeds',auth.ensureAuthenticated,mypages.realfeeds);
router.get('/mypage',auth.ensureAuthenticated,mypages.mypage);
router.post('/post/add',auth.ensureAuthenticated,(req,res)=>new Posts(req,res).create)
router.get('/mypagefriends',auth.ensureAuthenticated,mypages.mypagefriends);
router.get('/explore',auth.ensureAuthenticated,mypages.explore);
router.get('/chat',auth.ensureAuthenticated,mypages.chat);

router.get('/error',mypages.error)

module.exports = router;
