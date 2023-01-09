const UserInfo = require('../../model/userinfo')
const CommentModel = require('../../model/comments');
const Post = require('../../model/posts');
const Feed = require('../../model/feeds');
const Story = require('../../model/stories');
class Comment{
    
    postcomment= async(req,res)=>{
        let inputs = req.body
        let postid =inputs.postid;
        let userid = req.user._id

        CommentModel.create({
            text:inputs.text,
            user:userid,
            postfeedstoryid:postid
        }).then(comment=>{
           
            Post.findById(postid).then(post=>{
                post.comments.push(comment._id);
                post.save();

                return res.json({status:true,message:"successful",postid:postid})
            }).catch(err=>{
                console.log("post save failed",err)
            })
        }).catch(err1=>{
            console.log("post comment save failed",err1)
        })
    }
    feedcomment= async(req,res)=>{
        let inputs = req.body
        let feedid =inputs.feedid;
        let userid = req.user._id

        CommentModel.create({
            text:inputs.text,
            user:userid,
            postfeedstoryid:feedid
        }).then(comment=>{
           
            Feed.findById(feedid).then(feed=>{
                feed.comments.push(comment._id);
                feed.save();

                return res.json({status:true,message:"successful",feedid:feedid})
            }).catch(err=>{
                console.log("feed save failed",err)
            })
        }).catch(err1=>{
            console.log("feed comment save failed",err1)
        })
    }
    storycomment= async(req,res)=>{
        let inputs = req.body
        let storyid =inputs.storyid;
        let userid = req.user._id

        CommentModel.create({
            text:inputs.text,
            user:userid,
            postfeedstoryid:storyid
        }).then(comment=>{
           
            Story.findById(storyid).then(story=>{
                story.comments.push(comment._id);
                story.save();

                return res.json({status:true,message:"successful",storyid:storyid})
            }).catch(err=>{
                console.log("story save failed",err)
            })
        }).catch(err1=>{
            console.log("story comment save failed",err1)
        })
    }

    show= async (req,res)=>{
        CommentModel.find({_id:req.params.id}).populate([ {path:'user',populate:{path:'userinfo'}}]).then(resp=>{
            return res.json({status:true,data:resp})
        }).catch(err=>{
            console.log(err)
        })
    }
    delete = (id)=>{
        return CommentModel.deleteMany({postfeedstoryid:id})
    }
}

module.exports =Comment