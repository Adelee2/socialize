const UserInfo = require('../../model/userinfo')
const CommentModel = require('../../model/comments');
const Post = require('../../model/posts');
const Feed = require('../../model/feeds');
const Story = require('../../model/stories');
class Comment{
    constructor(req,res){
        this.req = req;
        this.res = res;

        
    }
    postcomment= ()=>{
        let inputs = this.req.body
        let postid =inputs.postid;
        let userid = this.req.user._id

        CommentModel.create({
            text:inputs.text,
            user:userid,
            postfeedstoryid:postid
        }).then(comment=>{
           
            Post.findById(postid).then(post=>{
                post.comments.push(comment._id);
                post.save();

                return this.res.json({status:true,message:"successful"})
            }).catch(err=>{
                console.log("post save failed",err)
            })
        }).catch(err1=>{
            console.log("post comment save failed",err1)
        })
    }
    feedcomment= ()=>{
        let inputs = this.req.body
        let feedid =inputs.feedid;
        let userid = this.req.user._id

        CommentModel.create({
            text:inputs.text,
            user:userid,
            postfeedstoryid:feedid
        }).then(comment=>{
           
            Feed.findById(feedid).then(feed=>{
                feed.comments.push(comment._id);
                feed.save();

                return this.res.json({status:true,message:"successful"})
            }).catch(err=>{
                console.log("feed save failed",err)
            })
        }).catch(err1=>{
            console.log("feed comment save failed",err1)
        })
    }
    storycomment= ()=>{
        let inputs = this.req.body
        let storyid =inputs.storyid;
        let userid = this.req.user._id

        CommentModel.create({
            text:inputs.text,
            user:userid,
            postfeedstoryid:storyid
        }).then(comment=>{
           
            Story.findById(storyid).then(story=>{
                story.comments.push(comment._id);
                story.save();

                return this.res.json({status:true,message:"successful"})
            }).catch(err=>{
                console.log("story save failed",err)
            })
        }).catch(err1=>{
            console.log("story comment save failed",err1)
        })
    }

    show=()=>{
        CommentModel.findById(this.req.query.id).populate([ {path:'user'}]).then(resp=>{
            return this.res.json({status:true,data:resp})
        })
    }
    
}

module.exports =Comment