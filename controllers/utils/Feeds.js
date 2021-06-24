
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
        }).populate([{path:'user'}]).sort([['createdAt', -1]])

        return results
    }
    create = ()=>{

    } 
    show= ()=>{

    }
    // get all info for one feed
    showOne = async()=>{
        Feed.findById(this.req.query.feedid).populate([ {path:'user'}, {path:'comments'},{path:'likes'} ]).sort({'comments.createdAt':-1}).then(resp=>{
            return this.res.json({status:true,message:resp})
        })
    }
    delete = ()=>{

    }
}
module.exports=Feeds