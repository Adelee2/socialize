
const User = require('../model/users')
const Postutil = require('./utils/Posts')
const Feedutil = require('./utils/Feeds')
const Storyutil = require('./utils/Stories')
const Userutil = require('./utils/Users')
const Post = require('../model/posts')
const moment = require('moment')
const UserInfo = require('../model/userinfo')
const Notification = require('./utils/Notification')

class Pages{
   constructor(){
    
   }
   postFile= function(req,res){
       let input = req.body
    if(!input) throw new Error("Emtpy parameters")
    Post.create({
        description:req.body.description,
        objtext:(req.body.url)?req.body.url:"",
        isdownload:req.body.isdownload,
        user:req.user._id
        }).then(resp=>{
            return res.json({status:true,message:"successful"})
        }).catch(err=>{
            console.log("err",err)
        })
    
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
        let stories = new Storyutil();
        let userinfo = new Userutil(req,res)
        userinfo.show().then(ress=>{
            // result1=ress;
            
            posts.index().then(ress1=>{
                stories.index(req,res).then(ress2=>{
                    if(JSON.stringify(ress1).length <=0 && JSON.stringify(ress2).length<=0){
                        res.redirect('/mypage');
                    }
                    else{
                        // console.log("pposts",JSON.stringify(ress1))
                        // console.log("sstory",ress2)
                        // console.log(res.json(ress1))
                        res.render('posts',{user: req.user,userinfos:ress,posts:JSON.stringify(ress1),stories:JSON.stringify(ress2),moment:moment});

                    }
                })
            })
        })

        // Promise.all([posts,stories]).then(([result1,result2])=>{

        // })
        
    }
    updateAvatar = async function(req,res) {
        // console.log(req.file)
        UserInfo.updateOne({_id:req.user.userinfo},{$set:{avatar:req.body.url}}, {upsert: true}, function(err,doc){
            if(err) throw new Error('could not update')
            // console.log(req.header)
            // console.log("doc",doc)
            return res.json({status:true,message:"successful"})
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
                    // console.log('mypost userinfo',ress1)
                    // console.log("friends",ress3)
                    res.render('mypage',{user: req.user, userinfos:ress, posts:JSON.stringify(ress1),friends:ress3,moment:moment});
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
                    res.render('mypagefriends',{user: req.user,posts:JSON.stringify(ress1),userinfos:ress,friends:ress2,moment:moment});

                })
            })
           
        })
                    // result3=ress3
        // console.log(result.userinfo);
    }
    viewProfile = async function(req,res){
        let userinfo = new Userutil(req,res)
        let myposts = new Postutil(req,res)
        userinfo.show().then(ress=>{

            // result1=ress;
            myposts.showProfile().then(ress1=>{
                 userinfo.profileFriends().then(ress2=>{
                     userinfo.showProfile().then(profile=>{
                        res.render('viewpersonpage',{user:req.user,newuser:profile, userinfos:ress, posts:JSON.stringify(ress1),friends:ress2,moment:moment});

                     })
                    //  console.log("profile",{user:ress,posts:ress1,friends:ress2})

                })
            })
           
        })

    }

    explore = async function(req,res){
        
        let userinfo = new Userutil(req,res)
        let friendreq = new Notification()
        userinfo.index().then(ress=>{
            userinfo.show().then(ress1=>{
                friendreq.all(req,res).then(ress2=>{
                    console.log("users",ress)
                    
                    res.render('explore',{user: req.user,userinfos:ress1,users:ress,friendrequest:ress2,moment:moment});
                })
                
            })
        })
        
        
    }
    // blog = function(req,res){
    //     res.render('blog',{user: req.user});
    // }

    message = async function(req,res){
      
        let userinfo = new Userutil(req,res)
        userinfo.show().then(ress=>{
            userinfo.friends().then(ress1=>{
                // if(ress1.length<=0){
                //     res.redirect('/explore')
                // }
                console.log('friends',ress1)
                res.render('chat',{user: req.user,userinfos:ress,friends:ress1});

            })
        })
        
    }


    //special
    getProfile = (req,res)=>{
        User.findOne({_id:req.query.userid}).populate([{path:'userinfo'}]).then(resp=>{
            return res.json({status:true,profile:resp})
        })
    }
    getSearch = (req,res)=>{
        User.find({name:{$regex: req.params.val, $options: 'i'}}).populate([{path:'userinfo'}]).limit(5).then(res1=>{
            console.log("searched",res1)
            if(res1){
                return res.json({status:true,message:res1});
            }
            return res.json({status:false,message:"no user found"})
        }).catch(err=>{
            console.log("search error",err)
        })
    }
    error = (req,res)=>{
        res.render('error')
    }
}
module.exports = Pages