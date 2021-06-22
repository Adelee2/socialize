

const User = require('../../model/users')
const UserInfo = require('../../model/userinfo');

class Users{
    constructor(req,res){
        this.req = req
        this.res= res
    }
    //get all users with userinfo
    index = async ()=>{
         let userinfo = await UserInfo.findById(this.req.user.userinfo)
            if(userinfo){
                var friendids = userinfo.friends.map(function(doc) { return doc._id; });
                    console.log(friendids)
                let post = await User.find({"user":{"$in":[...friendids, this.req.user._id] }},null)

                return post
            }
       
    }
    create = ()=>{

    } 
    //get only my userinfo
    show= async()=>{
        let userinfo =  await UserInfo.findById(this.req.user.userinfo)
        return userinfo
         
    }

    friends= async ()=>{
        
         let userinfo = await UserInfo.findById(this.req.user.userinfo)
            if(userinfo){
                
               let myfriends =  await User.find({"_id":{"$in":userinfo.friends}},null).populate('userinfo')
                // console.log("userinfo: ",userinfo)
            
                return myfriends
            }
        
    }
    delete = ()=>{

    }
}
module.exports=Users