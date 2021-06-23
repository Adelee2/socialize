
const { async } = require('q')
const Feed = require('../../model/feeds')

class Feeds{
    constructor(req,res){
        this.req = req;
        this.res = res
    }

    // get all feeds
    index = async ()=>{
        let results=[]
        await Feed.find({},function(result){
           results = result
        }).populate([ {path:'user'}, {path:'comments'},{path:'likes'} ])
        return results
    }
    create = ()=>{

    } 
    show= ()=>{

    }
    delete = ()=>{

    }
}
module.exports=Feeds