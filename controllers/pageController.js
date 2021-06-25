
const User = require('../model/users')
const Postutil = require('./utils/Posts')
const Feedutil = require('./utils/Feeds')
const Storyutil = require('./utils/Stories')
const Userutil = require('./utils/Users')
const Post = require('../model/posts')
const moment = require('moment')
const UserInfo = require('../model/userinfo')
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
        let userinfo = new Userutil(req,res)
        userinfo.show().then(ress=>{
            feeds.index().then(ress1=>{
                
                res.render('feeds',{user: req.user,userinfos:ress,feeds:ress1 });
            })
        })
        
    }
    posts = function(req,res){
        
        let posts = new Postutil(req,res);
        let stories = new Storyutil(req,res);
        let userinfo = new Userutil(req,res)
        userinfo.show().then(ress=>{
            // result1=ress;
            
            posts.show().then(ress1=>{
                stories.index().then(ress2=>{
                    if(ress1.length <=0 && ress2.length<=0){
                        res.redirect('/mypage');
                    }
                    else{
                        res.render('posts',{user: req.user,userinfos:ress,posts:ress1,stories:ress2,moment:moment});

                    }
                })
            })
        })

        // Promise.all([posts,stories]).then(([result1,result2])=>{

        // })
        
    }
    updateAvatar = async function(req,res) {
        console.log(req.file)
        UserInfo.updateOne({_id:req.user.userinfo},{$set:{avatar:req.file.filename}}, {upsert: true}, function(err,doc){
            if(err) throw new Error('could not update')
            // console.log(req.header)
            // console.log("doc",doc)
            res.redirect(req.header('Referer'))
        })
    }
    mypage = async function(req,res){
        // console.log(req.user);
        let userinfo = new Userutil(req,res)
        let myposts = new Postutil(req,res)

        userinfo.show().then(ress=>{
            // result1=ress;
            
            myposts.show().then(ress1=>{
                // result2=ress1
                
                userinfo.friends().then(ress3=>{
                    // result3=ress3
                    // console.log("result1",ress)
                    // console.log('result2',ress1)
                    // console.log("result3",ress3)
                    res.render('mypage',{user: req.user, userinfos:ress, posts:ress1,friends:ress3,moment:moment});
                });
            });
        });
         

    }
    
    mypagefriends = async function(req,res){
        // console.log(req.user);
        let userinfo = new Userutil(req,res)
        let myposts = new Postutil(req,res)

        userinfo.show().then(ress=>{
            // result1=ress;
            myposts.show().then(ress1=>{
                 userinfo.friends().then(ress2=>{
                    res.render('mypagefriends',{user: req.user,posts:ress1,userinfos:ress,friends:ress2,moment:moment});

                })
            })
           
        })
                    // result3=ress3
        // console.log(result.userinfo);
    }
    explore = async function(req,res){
        
        let userinfo = new Userutil(req,res)
        userinfo.index().then(ress=>{
            userinfo.show().then(ress1=>{
                console.log("users",ress)
                res.render('explore',{user: req.user,userinfos:ress1,users:ress,moment:moment});
            })
        })
        
        
    }
    // blog = function(req,res){
    //     res.render('blog',{user: req.user});
    // }

    message = async function(req,res){
        console.log('chat',req.user)
        let userinfo = new Userutil(req,res)
        userinfo.show().then(ress=>{
            userinfo.friends().then(ress1=>{
                // if(ress1.length<=0){
                //     res.redirect('/explore')
                // }
                res.render('chat',{user: req.user,userinfos:ress,friends:ress1});

            })
        })
        
    }
    error = (req,res)=>{
        res.render('error')
    }
}
module.exports = Pages