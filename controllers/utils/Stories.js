
const { async } = require('q')
const Story = require('../../model/stories')
const UserInfo = require('../../model/userinfo')

class Stories{
    
    //get both all your friends stories plus yours
    index = async(req,res)=>{

        let userinfo = await UserInfo.findById(req.user.userinfo)
        var friendids = userinfo.friends;
        friendids.push(req.user._id)
        let result = await Story.find({"user":{"$in":friendids }},null).populate([{path:'user'},{path:'likes'}])
        

        return result
    }
    add = async (req,res)=>{
        console.log("stories files",req.files)
        let files = req.files;
        await files.map(async(key,val)=>{
           await Story.create({
            objtext:key.filename,
            description:"",
            user:req.body.userid
            }).then(resp=>{
                UserInfo.findOne({user:req.body.userid}).then(resp1=>{
                    resp1.stories.push(resp._id)
                    resp1.save()
                })
            })
        })

        res.redirect('/')
        
    } 
    // get all info for one Story
    showOne = async(req,res)=>{
        Story.find({_id:req.params.storyid}).populate([ {path:'user'}, {path:'comments'},{path:'likes'} ]).sort({'comments.createdAt':-1}).then(resp=>{
            return res.json({status:true,data:resp})
        })
    }
    //get all stories for a user 
    show=async (req,res)=>{

        Story.find({"user":req.params.userid}).then((resp)=>{
            return res.json({status:true,story:resp})
        }).catch(err=>{
            console.log("fetch story err",err)
        })
    }
    delete = ()=>{

    }
}
module.exports=Stories