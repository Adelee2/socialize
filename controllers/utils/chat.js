const chat = require('../../model/chat')
class Chat{
    //show chat
    show = async(req,res) =>{
        let uidoption1 = req.user._id+"-"+req.body.toid
        let uidoption2 = req.body.toid+"-"+req.user._id

        chat.find({$or: [{conversationid: uidoption1}, {conversationid: uidoption2}]}).populate([{path:'to'}]).then(resp=>{

            return res.json({status:true,message:resp})
        })
    }
    //send message
    add =async(req,res)=>{

        let uid = req.user._id+"-"+req.body.toid
        chat.create({
            text:req.body.message,
            conversationid:uid,
            from:req.user._id,
            to:req.body.toid
        }).then(resp=>{
            return res.json({status:true,message:"successful"})
        })
    }

}

module.exports=Chat