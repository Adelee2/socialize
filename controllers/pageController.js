
const User = require('../model/users')
const Postutil = require('./utils/Posts')
const Feedutil = require('./utils/Feeds')
const Storyutil = require('./utils/Stories')
const Userutil = require('./utils/Users')
const Post = require('../model/posts')
const moment = require('moment')
class Pages{
   constructor(){
    
   }
   postFile= function(req,res){
       let input = req.body
    if(!input) throw new Error("Emtpy parameters")

    // console.log("req",req)
    // console.log('req.body',input)
    // console.log("req.user",req.user)
    if(input.option == "video"){
        let description = input.description
        let downloadoption = input.downloadable
        
        let objtext = req.file.filename
        console.log("postsvideo",objtext)
        Post.create({
            description:description,
            objtext:objtext,
            isdownload:downloadoption,
            user:req.user._id
            }).then(resp=>{
                res.redirect('/mypage')
            }).catch(err=>{
                console.log("err",err)
            })
    }
    else if(input.option=="image"){
        let description = input.description
        let myfile = req.file
        let downloadoption = input.downloadable
        let objtext = req.file.filename
        console.log("postsimage",objtext)
        Post.create({
            description:description,
            objtext:objtext,
            isdownload:downloadoption,
            user:req.user._id
            }).then(resp=>{
                res.redirect('/mypage')
            }).catch(err=>{
                console.log("err",err)
            })
    
    }
    else{
        let description = input.description
        // let downloadoption = input.downloadable
        console.log("else")
        Post.create({
            description:description,
            objtext:"",
            isdownload:false,
            user:req.user._id
        }).then(resp=>{
            res.redirect('/mypage')
        }).catch(err=>{
            console.log("err",err)
        })
    } 
   }
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
        
        res.render('posts',{user: req.user,posts:posts.index,stories:stories.index,moment:moment});
    }
    mypage = async function(req,res){
        // console.log(req.user);
        let userinfo = new Userutil(req,res)
        let myposts = new Postutil(req,res)
        let result1={},result2=[],result3=[];
        userinfo.show().then(ress=>{
            // result1=ress;
            
            myposts.show().then(ress1=>{
                // result2=ress1
                
                userinfo.friends().then(ress3=>{
                    // result3=ress3
                    console.log("result1",ress)
                    console.log('result2',ress1)
                    console.log("result3",ress3)

                    
                    res.render('mypage',{user: req.user, userinfos:ress, posts:ress1,friends:ress3,moment:moment});
                });
            });
        });
         

    }
    
    mypagefriends = async function(req,res){
        // console.log(req.user);
        let userinfo = new Userutil(req,res)
        
        // console.log(result.userinfo);
        res.render('mypagefriends',{user: req.user, userinfos:userinfo.show,friends:userinfo.friends,moment:moment});
    }
    explore = async function(req,res){
        let users=[]
        await User.find({},function(result1){
            users = result1
        })
        res.render('explore',{user: req.user,users,moment:moment});
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