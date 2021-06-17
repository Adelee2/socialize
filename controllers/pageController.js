const posts = require('../model/posts')
const stories = require('../model/stories')
const user = require('../model/users')
const notification = require('../model/notification')
const User = require('../model/users')
const UserInfo = require('../model/userinfo')
class Pages{
   
    realfeeds = function(req,res){
        res.render('feeds',{user: req.user});
    }
    posts = function(req,res){
        res.render('posts',{user: req.user});
    }
    mypage = async function(req,res){
        // console.log(req.user);
        let userinfos={}
         await UserInfo.findById(req.user.userinfo).then(userinfo=>{
            if(userinfo){
                userinfos = userinfo
                console.log("userinfo: ",userinfo)
            }
        }).catch(err=>{
            console.log("err userinfo: ",err)
        });
        // console.log(result.userinfo);
        res.render('mypage',{user: req.user, userinfos});
    }
    
    mypagefriends = async function(req,res){
        // console.log(req.user);
        let userinfos={}
         await UserInfo.findById(req.user.userinfo).then(userinfo=>{
            if(userinfo){
                userinfos = userinfo
                console.log("userinfo: ",userinfo)
            }
        }).catch(err=>{
            console.log("err userinfo: ",err)
        });
        // console.log(result.userinfo);
        res.render('mypagefriends',{user: req.user, userinfos});
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