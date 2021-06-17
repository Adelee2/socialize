const mongoose = require ('mongoose');

const feedSchema = new mongoose.Schema(
    {
      objtext: {
        type: String,
      },
      description:{
        type:String,
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
   
  const Feed = mongoose.model('Feed', feedSchema);

module.exports= Feed;
