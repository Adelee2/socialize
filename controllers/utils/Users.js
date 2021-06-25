

const User = require('../../model/users')
const UserInfo = require('../../model/userinfo');

class Users{
    constructor(req,res){
        this.req = req
        this.res= res
    }
    //get all users with userinfo
    index = async ()=>{
         
                let post = await User.find({},null)

                return post
            
    }
    create = ()=>{

    } 
    //get only my userinfo
    show= async()=>{
        let userinfo =  await UserInfo.findOne({_id:this.req.user.userinfo})
        return userinfo
         
    }

    friends= async ()=>{
        
         let userinfo = await UserInfo.findOne({_id:this.req.user.userinfo})
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