const posts = require('../model/posts')
const feeds = require('../model/feeds')
const user = require('../model/users')
const notification = require('../model/notification')
const User = require('../model/users')

class Pages{
   
    feeds = function(req,res){
        res.render('albums',{user: req.user});
    }
    posts = function(req,res){
        res.render('posts',{user: req.user});
    }
    mypage = function(req,res){
        console.log(req.user);
        const result = User.findById(req.user._id).populate('userinfo');
        // console.log(result.userinfo);
        res.render('mypage',{user: req.user, result});
    }
    explore = function(req,res){
        res.render('explore',{user: req.user});
    }
    // blog = function(req,res){
    //     res.render('blog',{user: req.user});
    // }

    chat = function(req,res){
        res.render('chat',{user: req.user});
    }
    error = (req,res)=>{
        res.render('error')
    }
}
module.exports = Pages