const chat = require('../../model/chat')
class Chat{
    //show chat
    show = async(req,res) =>{
        let uid = req.params.uid
        let id = uid.split('-')
        let uid1 = id[1]+'-'+id[0]
        chat.find({$or: [{ conversationid: uid }, { conversationid: uid1 }]}).populate([{path:'to',populate:{path:'userinfo'}},{path:'from',populate:{path:'userinfo'}}]).then(resp=>{
            // console.log("chat find",resp)
            if(resp.length ==0){
                chat.create({
                    message:"",
                    conversationid:uid,
                    from:id[0],
                    to:id[1]
                }).then(resp1=>{
                    // console.log("chat not found,creating..",resp1)
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
        // console.log("add message to db data",req)
        let uid = req.body.from+"-"+req.body.to
        await chat.create({
            message:req.body.message,
            conversationid:uid,
            from:req.body.from,
            to:req.body.to
        }).then(resp=>{
            return res.json({status:true,message:"successful"})
        })
    }

}

module.exports=Chat