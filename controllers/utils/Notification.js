const FriendRequest = require("../../model/friendrequest")
const UserInfo = require("../../model/userinfo")


class Notification{
    
    index = (req,res)=>{
        FriendRequest.find({friendrequestto:req.user._id}).populate([{path:'friendrequestfrom'}]).then(ress=>{
            return res.json({status:true,friendrequests:ress})
        })
    }
    send = (req,res)=>{
        FriendRequest.create({
            friendrequestto:req.body.to,
            friendrequestfrom:req.user._id,
            accept:false
        }).then(resp=>{
            return res.json({status:true,message:"successful",request:resp})
        })
    } 
    add= (req,res)=>{
        FriendRequest.findOne({_id:req.params.requestid}).then((ress)=>{
            if(ress){
                let fromid = ress.friendrequestfrom
                let toid = ress.friendrequestto
                ress.remove()
                UserInfo.findOne({user:fromid}).then(resp1=>{
                    UserInfo.findOne({user:toid}).then(resp2=>{
                        resp1.friends.push(toid)
                        resp2.friends.push(fromid)

                        return res.json({status:true,message:"friend accepted!"})
                    })
                    
                })
            }
        })
    }
    delete = (req,res)=>{

    }
}
module.exports=Notification