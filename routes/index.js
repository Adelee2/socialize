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
const Notification = require('../controllers/utils/Notification');
const Chat = require('../controllers/utils/chat');

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
var storagestories = multer.diskStorage({
    destination:"./public/Uploads",
    filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname+"-"+Date.now() + '-' + Math.round(Math.random() * 1E5)
    //   console.log(uniqueSuffix+'-'+path.extname(file.originalname))
    cb(null, uniqueSuffix+path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage, limits:{ fileSize: 104857600 } }).single('posts')
let uploadfeed = multer({storage:storage, limits:{ fileSize: 100000 }}).single('feeds')
let uploadstories = multer({storage:storagestories,limits:{fileSize:52428800}}).array('stories', 3)
let uploadavatar = multer({storage:storageavatar,limits:{ fileSize: 5000 }}).single('avatar')

// var postutils = new Posts()
/* Auth. */
router.post('/sessionlogin', (req, res) => passport.authenticate('local-signin', { successRedirect: '/', failureRedirect: '/login', })(req, res));

router.get('/login',auth.login );
router.get('/register', auth.register );
router.post('/sessionregister',auth.sessionregister);
router.get('/logout', auth.ensureAuthenticated,auth.logout);

// Dashboard
router.get('/',auth.ensureAuthenticated,mypages.posts);
router.get('/feeds',auth.ensureAuthenticated,mypages.realfeeds);
router.get('/mypage',auth.ensureAuthenticated,mypages.mypage);
router.post('/post/add',auth.ensureAuthenticated,upload,mypages.postFile);
router.post('/avatar/add',auth.ensureAuthenticated,uploadavatar,mypages.updateAvatar);
router.post('/story/add',auth.ensureAuthenticated,uploadstories,new Stories().add);

// router.get('/mypagefriends',auth.ensureAuthenticated,mypages.mypagefriends);
router.get('/explore',auth.ensureAuthenticated,mypages.explore);
router.get('/chat',auth.ensureAuthenticated,mypages.message);
router.get('/profile',auth.ensureAuthenticated,mypages.viewProfile)
// API-like
router.post('/post/comment/add',auth.ensureAuthenticated,new commentutil().postcomment)
router.post('/feed/comment/add',auth.ensureAuthenticated,new commentutil().feedcomment)
router.post('/story/comment/add',auth.ensureAuthenticated,new commentutil().storycomment)
router.post('/post/likes/add',auth.ensureAuthenticated,new likesutil().postlike)
router.post('/feed/likes/add',auth.ensureAuthenticated,new likesutil().feedlike)
router.post('/story/likes/add',auth.ensureAuthenticated,new likesutil().storylike)

router.get('/post/one/:postid',auth.ensureAuthenticated,new Posts().showOne)
router.get('/feed/one/:feedid',auth.ensureAuthenticated,new Feeds().showOne)
router.get('/story/one/:storyid',auth.ensureAuthenticated,new Stories().showOne)
router.get('/story/user/:userid',auth.ensureAuthenticated,new Stories().show)

router.get('/comment/post/one/:id',auth.ensureAuthenticated,new commentutil().show)
router.get('/comment/feed/one/:id',auth.ensureAuthenticated,new commentutil().show)
router.get('/comment/story/one/:id',auth.ensureAuthenticated,new commentutil().show)

router.get('/post/likes/:id',auth.ensureAuthenticated,new likesutil().getpostlikes)
router.get('/feed/likes/:id',auth.ensureAuthenticated,new likesutil().getfeedlikes)
router.get('/story/likes/:id',auth.ensureAuthenticated,new likesutil().getstorylikes)

// anything friendship
router.get('/notification',auth.ensureAuthenticated,new Notification().index)
router.post('/friendrequest/add',auth.ensureAuthenticated,new Notification().send)
router.get('/friend/add/:requestid',auth.ensureAuthenticated,new Notification().add)

//chat
router.post('/message/add',auth.ensureAuthenticated,new Chat().add)
router.get('/message/:uid',auth.ensureAuthenticated, new Chat().show)

router.get('/error',mypages.error)

module.exports = router;
