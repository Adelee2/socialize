
const { async } = require('q');
const Post = require('../../model/posts')
const UserInfo = require('../../model/userinfo')
const fileUpload = require('./fileupload')

class Posts{
    constructor(req,res){
        this.req = req;
        this.res = res;

        
    }
    //get all my friends posts plus mine
    index = async ()=>{
         let userinfo = await UserInfo.findById(this.req.user.userinfo)
        var friendids = userinfo.friends.map(function(doc) { return doc._id; });
        console.log(friendids)
        let post = await Post.find({"user":{"$in":[...friendids, this.req.user._id] }},null).populate([{path:'user'}]).sort([['createdAt', -1]])
        //.populate([ {path:'user'}, {path:'comments'},{path:'likes'} ])
        
        return post
       
    }
    create = async ()=>{
       
        
    } 
    update = (obj, updateobj)=>{
        let result = Post.findById(obj._id)
        if(result){
           let finalresult = result.save(updateobj)
           return finalresult
        }

        return result
    }
    // get all info for one post
    showOne = async()=>{
        Post.findById(this.req.query.postid).populate([ {path:'user'}, {path:'comments'},{path:'likes'} ]).sort({'comments.createdAt':-1}).then(resp=>{
            return this.res.json({status:true,message:resp})
        })
    }
    //get only my posts
    show= async()=>{
        // console.log("mypost",this.req.user)
        let post = await Post.find({"user":this.req.user._id },null).populate([{path:'user'}]).sort([['createdAt', -1]])
        //.populate([ {path:'user'}, {path:'comments'},{path:'likes'} ])
        
        return post
    }
    delete = ()=>{

    }
}
module.exports=Posts