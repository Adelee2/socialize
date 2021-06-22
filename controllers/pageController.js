
const User = require('../model/users')
const Postutil = require('./utils/Posts')
const Feedutil = require('./utils/Feeds')
const Storyutil = require('./utils/Stories')
const Userutil = require('./utils/Users')


class Pages{
   
    realfeeds = function(req,res){
        
        let feeds = new Feedutil(req,res)
        res.render('feeds',{user: req.user,feeds:feeds.index });
    }
    posts = function(req,res){
        
        let posts = new Postutil(req,res);
        let stories = new Storyutil(req,res);
        console.log("posts:",posts.index)
        console.log("stories:",stories.index)

        // Promise.all([posts,stories]).then(([result1,result2])=>{

        // })
        
        res.render('posts',{user: req.user,posts:posts.index,stories:stories.index});
    }
    mypage = async function(req,res){
        // console.log(req.user);
        let userinfo = new Userutil(req,res)
        let myposts = new Postutil(req,res)
        let result1,result2,result3;
        userinfo.show().then(ress=>{
            result1=ress;
            console.log("result1",ress)
        });
         myposts.show().then(ress1=>{
            result2=ress1
            console.log('result2',ress1)
        });
        userinfo.friends().then(ress3=>{
            result3=ress3
            console.log("result3",ress3)
        });
        
        
        // Promise.all([userinfo.friends,myposts.show]).then(([res1,res2])=>{
        //     console.log("friends",res1);
        //     console.log("posts",res2)
        // })

        res.render('mypage',{user: req.user, userinfos:result1, posts:result2,friends:result3});
    }
    
    mypagefriends = async function(req,res){
        // console.log(req.user);
        let userinfo = new Userutil(req,res)
        
        // console.log(result.userinfo);
        res.render('mypagefriends',{user: req.user, userinfos:userinfo.show,friends:userinfo.friends});
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
        let userinfo = new Userutil(req,res)

        res.render('chat',{user: req.user,friends:userinfo.friends});
    }
    error = (req,res)=>{
        res.render('error')
    }
}
module.exports = Pages