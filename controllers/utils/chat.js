const chat = require('../../model/chat')
class Chat{
    //show chat
    show = async(req,res) =>{
        let uid = req.params.uid
        let id = uid.split('-')
        chat.find({conversationid: uid}).populate([{path:'to'},{path:'from'}]).then(resp=>{
            console.log("chat find",resp)
            if(resp.length ==0){
                chat.create({
                    message:"",
                    conversationid:uid,
                    from:id[0],
                    to:id[1]
                }).then(resp1=>{
                    console.log("chat not found,creating..",resp1)
                    return res.json({status:true,message:resp1})
                })
            }
            else{
                return res.json({status:true,message:resp})
            }

            
        })
    }
    //send message
    add =async(req,res)=>{

        let uid = req.user._id+"-"+req.body.toid
        chat.create({
            message:req.body.message,
            conversationid:uid,
            from:req.user._id,
            to:req.body.toid
        }).then(resp=>{
            return res.json({status:true,message:"successful"})
        })
    }

}

module.exports=Chat