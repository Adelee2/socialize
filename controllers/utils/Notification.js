const FriendRequest = require("../../model/friendrequest")
const Notify = require("../../model/notification")
const UserInfo = require("../../model/userinfo")
const User = require("../../model/users")

class Notification{
    
    index = (req,res)=>{
        FriendRequest.find({friendrequestto:req.user._id}).populate([{path:'friendrequestfrom'}]).then(ress=>{
            return res.json({status:true,friendrequests:ress})
        })
    }
    all = (req,res)=>{
       let result= FriendRequest.find({}).populate([{path:'friendrequestfrom'},{path:'friendrequestto'}])

       return result;
    }
    send = (req,res)=>{
        // console.log("notify reqid",req.user._id)
        User.findOne({_id:req.user._id}).populate([{path:'userinfo'}]).then(userinfo=>{
            console.log("notify userinfo",userinfo)
            let friends = userinfo.userinfo.friends
            if(friends.length ==0){
                FriendRequest.create({
                    friendrequestto:req.body.to,
                    friendrequestfrom:req.user._id,
                    accept:false
                }).then(resp=>{
                    Notify.create({notify:true}).then(resps =>{
                        resps.friendrequest.push(resp._id)
                        resps.save();
                        return res.json({status:true,message:"successful",request:resp})
                    })
                }).catch(err=>{
                    console.log("friend request err",err)
                })
            }
            else if(friends.includes(req.body.to)){
                return res.json({status:false,message:"You are already friends"})
            }
            else{
                // console.log("frireq body",{friendrequestto:req.body.to,
                //     friendrequestfrom:req.user._id,
                //     accept:false})
                FriendRequest.create({
                    friendrequestto:req.body.to,
                    friendrequestfrom:req.user._id,
                    accept:false
                }).then(resp=>{
                    Notify.create({notify:true}).then(resps =>{
                        resps.friendrequest.push(resp._id)
                        resps.save();
                        return res.json({status:true,message:"successful",request:resp})
                    })
                }).catch(err=>{
                    console.log("friend request err",err)
                })
            }
        })
        
    } 
    add= (req,res)=>{
        FriendRequest.findOne({_id:req.params.requestid}).then((ress)=>{
            if(ress){
                let fromid = ress.friendrequestfrom
                let toid = ress.friendrequestto
                console.log({fromid:fromid,toid:toid})
                ress.remove()
                User.findOne({_id:fromid}).then(user=>{
                    UserInfo.findOne({_id:user.userinfo}).then(userinfo=>{
                        userinfo.friends.push(toid)
                        userinfo.save()
                        User.findOne({_id:toid}).then(user1=>{
                            UserInfo.findOne({_id:user1.userinfo}).then(userinfo1=>{
                            
                            userinfo1.friends.push(fromid)
                            userinfo1.save();
    
                            return res.json({status:true,message:"friend request accepted!"})
                        })
                    })
                    })
                    
                    
                })
            }
        })
    }
    delete = (req,res)=>{

    }
}
module.exports=Notification