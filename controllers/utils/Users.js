

const User = require('../../model/users')
const UserInfo = require('../../model/userinfo');
const { async } = require('q');

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
    showProfile= async()=>{
        let userinfo =  await User.findOne({_id:this.req.query.userid}).populate([{path:'userinfo'}])
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
    profileFriends = async ()=>{
        // console.log(this.req.params)
        let user = await User.findOne({_id:this.req.query.userid}).populate([{path:'userinfo'}])
        // console.log("profileFriends",user)
           if(user.userinfo){
               
              let myfriends =  await User.find({"_id":{"$in":user.userinfo.friends}},null).populate('userinfo')
               // console.log("userinfo: ",userinfo)
           
               return myfriends
           }
   }
    delete = ()=>{

    }
}
module.exports=Users