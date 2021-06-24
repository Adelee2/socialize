const UserInfo = require('../../model/userinfo')
const LikeModel = require('../../model/likes');
const Post = require('../../model/posts');
const Feed = require('../../model/feeds');
const Story = require('../../model/stories');
class Like{
    constructor(req,res){
        this.req = req;
        this.res = res;

        
    }
    postlike= ()=>{
        let inputs = this.req.body
        let postid =inputs.postid;
        let userid = this.req.user._id

        LikeModel.create({
            togglelike:true,
            user:userid,
            postfeedstoryid:postid
        }).then(like=>{
           
            Post.findById(postid).then(post=>{
                post.likes.push(like._id);
                post.save();

                return res.json({status:true,message:"successful"})
            }).catch(err=>{
                console.log("post save failed",err)
            })
        }).catch(err1=>{
            console.log("post like save failed",err1)
        })
    }
    feedlike= ()=>{
        let inputs = this.req.body
        let feedid =inputs.feedid;
        let userid = this.req.user._id

        LikeModel.create({
            togglelike:true,
            user:userid,
            postfeedstoryid:feedid
        }).then(like=>{
           
            Feed.findById(feedid).then(feed=>{
                feed.likes.push(like._id);
                feed.save();

                return res.json({status:true,message:"successful"})
            }).catch(err=>{
                console.log("feed save failed",err)
            })
        }).catch(err1=>{
            console.log("feed like save failed",err1)
        })
    }
    storylike= ()=>{
        let inputs = this.req.body
        let storyid =inputs.storyid;
        let userid = this.req.user._id

        LikeModel.create({
            togglelike:true,
            user:userid,
            postfeedstoryid:storyid
        }).then(like=>{
           
            Story.findById(storyid).then(story=>{
                story.likes.push(like._id);
                story.save();

                return res.json({status:true,message:"successful"})
            }).catch(err=>{
                console.log("story save failed",err)
            })
        }).catch(err1=>{
            console.log("story like save failed",err1)
        })
    }
}

module.exports =Like