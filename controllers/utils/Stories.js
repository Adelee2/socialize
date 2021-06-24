
const { async } = require('q')
const Story = require('../../model/stories')
const UserInfo = require('../../model/userinfo')

class Stories{
    constructor(req,res){
        this.req = req;
        this.res = res
    }
    //get both all your friends stories plus yours
    index = async()=>{

        let userinfo = await UserInfo.findById(this.req.user.userinfo)
        var friendids = userinfo.friends.map(function(doc) { return doc._id; });
            console.log(friendids)
        let result = await Story.find({"user":{"$in":[...friendids, this.req.user._id] }},null)
        

        return result
    }
    create = ()=>{

    } 
    // get all info for one Story
    showOne = async()=>{
        Story.findById(this.req.query.storyid).populate([ {path:'user'}, {path:'comments'},{path:'likes'} ]).sort({'comments.createdAt':-1}).then(resp=>{
            return this.res.json({status:true,message:resp})
        })
    }
    //get your stories only 
    show=async ()=>{
        let result =[]
        await Story.find({"user":this.req.user._id},function(story){
            result = story
        })
        return result
    }
    delete = ()=>{

    }
}
module.exports=Stories