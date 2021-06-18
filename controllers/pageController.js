const Posts = require('../model/posts')
const Stories = require('../model/stories')
const User = require('../model/users')
// const Feed
const Notification = require('../model/notification')
const UserInfo = require('../model/userinfo')
const Feed = require('../model/feeds')

class Pages{
   
    realfeeds = async function(req,res){
        let feeds=[];
        await Feed.find({},function(result){
            feeds= result
        })
        res.render('feeds',{user: req.user,feeds});
    }
    posts = async function(req,res){
        let posts = []
        let stories=[]

        let firstfunct = async ()=>{
                return await UserInfo.findById(req.user.userinfo).then( async userinfo=>{
                var friendids = userinfo.friends.map(function(doc) { return doc._id; });
                    console.log(friendids)
                    await Posts.find({"user":{"$in":[...friendids, req.user._id] }},function(post){
                        return post
                    })
            })
        }
        let secondfunct = async () =>{
            return await Stories.find({"user":req.user._id},function(story){
                return story
            })
        }
        posts = firstfunct
        stories= secondfunct
       
        console.log("posts:",posts)
        console.log("stories:",stories)
        
        res.render('posts',{user: req.user,posts,stories});
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
    explore = async function(req,res){
        let users=[]
        await User.find({},function(result1){
            users = result1
        })
        res.render('explore',{user: req.user,users});
    }
    // blog = function(req,res){
    //     res.render('blog',{user: req.user});
    // }

    chat = async function(req,res){
        let friends= []
         await UserInfo.findById(req.user.userinfo).then(async userinfo=>{
            if(userinfo){
                
                await User.find({"_id":{"$in":userinfo.friends}},function(myfriends){
                    friends =myfriends
                })
                // console.log("userinfo: ",userinfo)
            }
        }).catch(err=>{
            console.log("err userinfo: ",err)
        });

        res.render('chat',{user: req.user,friends});
    }
    error = (req,res)=>{
        res.render('error')
    }
}
module.exports = Pages