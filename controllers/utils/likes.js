const UserInfo = require('../../model/userinfo')
const LikeModel = require('../../model/likes');
const Post = require('../../model/posts');
const Feed = require('../../model/feeds');
const Story = require('../../model/stories');
class Like{
    
    postlike= async(req,res)=>{
        let inputs = req.body
        let postid =inputs.postid;
        let userid = req.user._id

        LikeModel.findOne({user:userid, postfeedstoryid:postid}).then( (like)=>{
            if(like){
                like.save(
                    {togglelike:req.body.toggle,
                    user:userid,
                    postfeedstoryid:postid
                })
                return res.json({status:true,message:"successful",likes:like})
            }
            else{
                LikeModel.create(
                    {togglelike:req.body.toggle,
                    user:userid,
                    postfeedstoryid:postid
                }).then(like1=>{
                    Post.findById(postid).then(post=>{
                        post.likes.push(like1._id);
                        post.save();
        
                        return res.json({status:true,message:"successful",likes:like1,post:post})
                    }).catch(err=>{
                        console.log("post save failed",err)
                    })
                })
            }
            
        })
    }
    feedlike= async(req,res)=>{
        let inputs = req.body
        let feedid =inputs.feedid;
        let userid = req.user._id

        LikeModel.findOne({user:userid, postfeedstoryid:feedid}).then( (like)=>{
            if(like){
                like.save(
                    {togglelike:req.body.toggle,
                    user:userid,
                    postfeedstoryid:feedid
                })
                return res.json({status:true,message:"successful",likes:like})
            }
            else{
                LikeModel.create(
                    {togglelike:req.body.toggle,
                    user:userid,
                    postfeedstoryid:feedid
                }).then(like1=>{
                    Feed.findById(feedid).then(feed=>{
                        feed.likes.push(like1._id);
                        feed.save();

                        return res.json({status:true,message:"successful",likes:like1,feed:feed})
                    }).catch(err=>{
                        console.log("feed save failed",err)
                    })
                })
            }
        })
    }
    storylike= async(req,res)=>{
        let inputs = req.body
        let storyid =inputs.storyid;
        let userid = req.user._id
        
        LikeModel.findOne({user:userid, postfeedstoryid:storyid}).then( (like)=>{
            if(like){
                like.save(
                    {togglelike:req.body.toggle,
                    user:userid,
                    postfeedstoryid:storyid
                })
                return res.json({status:true,message:"successful",likes:like})
            }
            else{
                LikeModel.create(
                    {togglelike:req.body.toggle,
                    user:userid,
                    postfeedstoryid:storyid
                }).then(like1=>{
                Story.findById(storyid).then(story=>{
                    story.likes.push(like1._id);
                    story.save();

                    return res.json({status:true,message:"successful",likes:like1,story:story})
                }).catch(err=>{
                    console.log("story save failed",err)
                })
            });
        }
    })
        
    }
}

module.exports =Like