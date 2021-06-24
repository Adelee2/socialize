var express = require('express');
var router = express.Router();
let pageController = require('../controllers/pageController');
var passport = require('passport');
let mypages = new pageController();
const Auth = require('../controllers/authController');
var multer = require('multer')
var path = require('path')

var auth = new Auth();
var storage = multer.diskStorage({
    destination:"./public/Uploads",
    filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname+"-"+Date.now() + '-' + Math.round(Math.random() * 1E5)
    //   console.log(uniqueSuffix+'-'+path.extname(file.originalname))
    cb(null, uniqueSuffix+path.extname(file.originalname))
    }
})
var storageavatar = multer.diskStorage({
    destination:"./public/Uploads/Avatar",
    filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname+"-"+Date.now() + '-' + Math.round(Math.random() * 1E5)
    //   console.log(uniqueSuffix+'-'+path.extname(file.originalname))
    cb(null, uniqueSuffix+path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage, limits:{ fileSize: 50000 } }).single('posts')
let uploadfeed = multer({storage:storage, limits:{ fileSize: 50000 }}).single('feeds')
let uploadavatar = multer({storage:storageavatar,limits:{ fileSize: 5000 }}).single('avatar')

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
router.post('/post/add',auth.ensureAuthenticated,upload,mypages.postFile);
router.post('/avatar/add',auth.ensureAuthenticated,uploadavatar,mypages.updateAvatar);
router.get('/mypagefriends',auth.ensureAuthenticated,mypages.mypagefriends);
router.get('/explore',auth.ensureAuthenticated,mypages.explore);
router.get('/chat',auth.ensureAuthenticated,mypages.message);

router.get('/error',mypages.error)

module.exports = router;
