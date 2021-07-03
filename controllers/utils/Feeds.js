
const { async } = require('q')
const Feed = require('../../model/feeds')

class Feeds{
    constructor(req,res){
        this.req = req;
        this.res = res
    }

    // get all feeds
    index = async ()=>{
        let results= Feed.find({},function(result){
           results = result
        }).populate([{path:'user',populate:{path:'userinfo'}}]).sort([['createdAt', -1]])

        return results
    }
    create = ()=>{

    } 
    show= ()=>{

    }
    // get all info for one feed
    showOne = async(req,res)=>{
        Feed.find({_id:req.params.feedid}).populate([ {path:'user',populate:{path:'userinfo'}}, {path:'comments'},{path:'likes'} ]).sort({'comments.createdAt':-1}).then(resp=>{
            return res.json({status:true,data:resp})
        })
    }
    delete = ()=>{

    }
}
module.exports=Feeds