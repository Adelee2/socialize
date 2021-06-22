
const { async } = require('q');
const Post = require('../../model/posts')
const UserInfo = require('../../model/userinfo')
const fileUpload = require('./fileupload')

class Posts{
    constructor(req,res){
        this.req = req;
        this.res = res
    }
    //get all my friends posts plus mine
    index = async ()=>{
         let userinfo = await UserInfo.findById(this.req.user.userinfo)
        var friendids = userinfo.friends.map(function(doc) { return doc._id; });
        console.log(friendids)
        let post = await Post.find({"user":{"$in":[...friendids, this.req.user._id] }},null)
        
        return post
       
    }
    create = ()=>{
        const Upload = new fileUpload(this.req,this.res);

        if(!this.req.body) throw new Error("Emtpy parameters")
        if(this.req.body.option == "video"){
            let description = this.req.body.description
            let video = this.req.file
            let downloadoption = this.req.body.downloadable
            let filename = Date.now() + '-' + Math.round(Math.random() * 1E9)+this.req.file.fieldname
            Upload.uploadFile("videos",filename).then(async res=>{
                if (res){
                    let url = await firebase.storage().ref("videos" +'/' + res).getDownloadURL();
                    Post.create({
                        description:description,
                        objtext: url,
                        isdownload:(downloadoption=="true")? true :false,
                        user:this.req.user._id
                    }).then(respost=>{

                    })
                }
            })
        }
        else if(this.req.body.option=="image"){
            let description = this.req.body.description
            let image = this.req.file
            let downloadoption = this.req.body.downloadable
            let filename = Date.now() + '-' + Math.round(Math.random() * 1E9)+this.req.file.fieldname
            Upload.uploadFile("images",filename).then(async res=>{
                if (res){
                    let url = await firebase.storage().ref("images" +'/' + res).getDownloadURL();
                    Post.create({
                        description:description,
                        objtext: url,
                        isdownload:(downloadoption=="true")? true :false,
                        user:this.req.user._id
                    }).then(respost=>{
                        
                    })
                }
            })
        }
        else{
            let description = this.req.body.description
            let downloadoption = this.req.body.downloadable

        }

    } 
    update = ()=>{
        
    }
    //get only my posts
    show= async()=>{
        console.log("mypost",this.req.user)
        let post = await Post.find({"user":this.req.user._id },null)
        
        return post
    }
    delete = ()=>{

    }
}
module.exports=Posts