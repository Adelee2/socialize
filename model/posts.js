const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema(
    {
      objtext: {
        type: String,
      },
      isdownload:{
        type:Boolean
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      likes:[
            {
                type: mongoose.Schema.Types.ObjectId,ref:'Likes'
            }
        ],
      comments:[
          {
            type: mongoose.Schema.Types.ObjectId,ref:'Comment'
          }
      ]
    },
    { timestamps: true },
  );
   
  const Post = mongoose.model('Post', postSchema);

  module.exports= Post;
