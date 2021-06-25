const FriendRequest = require("../../model/friendrequest")
const UserInfo = require("../../model/userinfo")


class Notification{
    
    index = (req,res)=>{
        FriendRequest.find({friendrequestto:req.user._id}).populate([{path:'friendrequestfrom'}]).then(ress=>{
            return res.json({status:true,friendrequests:ress})
        })
    }
    send = (req,res)=>{
        // console.log("notify reqid",req.user._id)
        User.findOne({id:req.user._id}).populate([{path:'userinfo'}]).then(userinfo=>{
            console.log("notify userinfo",userinfo)
            let friends = userinfo.friends
            if(friends.includes(req.body.to)){
                return res.json({status:false,message:"You are already friends"})
            }
            else{
                FriendRequest.create({
                    friendrequestto:req.body.to,
                    friendrequestfrom:req.user._id,
                    accept:false
                }).then(resp=>{
                    return res.json({status:true,message:"successful",request:resp})
                })
            }
        })
        
    } 
    add= (req,res)=>{
        FriendRequest.findOne({_id:req.params.requestid}).then((ress)=>{
            if(ress){
                let fromid = ress.friendrequestfrom
                let toid = ress.friendrequestto
                ress.remove()
                UserInfo.findOne({user:fromid}).then(me=>{
                    UserInfo.findOne({user:toid}).then(thefriend=>{
                        me.friends.push(toid)
                        thefriend.friends.push(fromid)

                        return res.json({status:true,message:"friend request accepted!"})
                    })
                    
                })
            }
        })
    }
    delete = (req,res)=>{

    }
}
module.exports=Notification