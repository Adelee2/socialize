const mongoose = require ('mongoose');

const StorySchema = new mongoose.Schema(
    {
      objtext: {
        type: String,
      },
      description:{
        type:String,
      },
      softdelete:{
        type:Boolean,
        default:false
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
   
  const Story = mongoose.model('Story', StorySchema);

module.exports= Story;
