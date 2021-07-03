
const { async } = require('q')
const Story = require('../../model/stories')
const UserInfo = require('../../model/userinfo')
const moment = require('moment')
class Stories{
    
    //get both all your friends stories plus yours
    index = async(req,res)=>{

        let userinfo = await UserInfo.findById(req.user.userinfo)
        var friendids = userinfo.friends;
        friendids.push(req.user._id)
        // console.log("current date",moment().format())
        // console.log("current plus 24",moment().add(1, 'days').format())
        let result = await Story.find({ 
                    user:{$in:friendids },
                    createdAt:{
                        $gt:moment().subtract(1, "days").format(),
                        $lt:moment().add(1, 'days').format()
                    } 
                }).populate([{path:'user',populate:{path:'userinfo'}},{path:'likes'}])
        
        
        return result
    }
    add = async (req,res)=>{
        
        await Story.findOne({user:req.body.userid, "createdAt":{$gt:moment().subtract(1, "days").format(),$lt:moment().add(1, 'days').format()}}).then(story=>{
            console.log("story found?",story)
            if(story){
                story.objtext.push(req.body.url)
                story.save()
                
                
            }else{
                Story.create({
                    objtext:req.body.url,
                    description:"",
                    user:req.body.userid
                    }).then(resp=>{
                        UserInfo.findOne({user:req.body.userid}).then(resp1=>{
                            resp1.stories.push(resp._id)
                            resp1.save()
        
                        })
                    })
            }
            return res.json({status:true, message:"successful"})
        })
        
        
        
    } 
    // get all info for one Story
    showOne = async(req,res)=>{
        Story.find({"createdAt":{$gt:moment().subtract(1, "days").format(),$lt:moment().add(1, 'days').format()},_id:req.params.storyid}).populate([ {path:'user',populate:{path:'userinfo'}}, {path:'comments'},{path:'likes'} ]).sort({'comments.createdAt':-1}).then(resp=>{
            return res.json({status:true,data:resp})
        })
    }
    //get all stories for a user 
    show=async (req,res)=>{

        Story.find({"user":req.params.userid, "createdAt":{$gt:moment().subtract(1, "days").format(),$lt:moment().add(1, 'days').format()} }).then((resp)=>{
            return res.json({status:true,story:resp})
        }).catch(err=>{
            console.log("fetch story err",err)
        })
    }
    delete = ()=>{

    }
}
module.exports=Stories