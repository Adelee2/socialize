var express = require('express');
var router = express.Router();
let pageController = require('../controllers/pageController');
let commentutil = require('../controllers/utils/comment')
let likesutil = require('../controllers/utils/likes')
var passport = require('passport');
let mypages = new pageController();
// let comment = new commentutil()
const Auth = require('../controllers/authController');
var multer = require('multer')
var path = require('path');
const Posts = require('../controllers/utils/Posts');
const Feeds = require('../controllers/utils/Feeds');
const Stories = require('../controllers/utils/Stories');

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

let upload = multer({ storage: storage, limits:{ fileSize: 100000 } }).single('posts')
let uploadfeed = multer({storage:storage, limits:{ fileSize: 100000 }}).single('feeds')
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

// API-like
router.post('/post/comment/add',auth.ensureAuthenticated,(req,res)=>new commentutil(req,res).postcomment)
router.post('/feed/comment/add',auth.ensureAuthenticated,(req,res)=>new commentutil(req,res).feedcomment)
router.post('/story/comment/add',auth.ensureAuthenticated,(req,res)=>new commentutil(req,res).storycomment)
router.post('/post/likes/add',auth.ensureAuthenticated,(req,res)=>new likesutil(req,res).postlike)
router.post('/feed/likes/add',auth.ensureAuthenticated,(req,res)=>new likesutil(req,res).feedlike)
router.post('/story/likes/add',auth.ensureAuthenticated,(req,res)=>new likesutil(req,res).storylike)
router.get('/post/one/:postid',auth.ensureAuthenticated,(req,res)=>new Posts(req,res).showOne)
router.get('/feed/one/:feedid',auth.ensureAuthenticated,(req,res)=>new Feeds(req,res).showOne)
router.get('/story/one/:storyid',auth.ensureAuthenticated,(req,res)=>new Stories(req,res).showOne)

router.get('/error',mypages.error)

module.exports = router;
