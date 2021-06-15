const posts = require('../model/posts')
const feeds = require('../model/feeds')
const user = require('../model/users')
const notification = require('../model/notification')

class Pages{
   
    feeds = function(req,res){
        res.render('albums',{user: req.user});
    }
    posts = function(req,res){
        res.render('posts',{user: req.user});
    }
    mypage = function(req,res){
        res.render('mypage',{user: req.user});
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