const mongoose = require ('mongoose');

const notifySchema = new mongoose.Schema(
  {
      notify:{
        type:Boolean,
        default:true
      },
    friendrequest:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'FriendRequest'

        }
    ],
    like:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Likes'

        }
    ],
    comment:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Comment'

        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,ref:'User'

    }
  },
  { timestamps: true },
);

const Notify = mongoose.model('Notification', notifySchema);
 
module.exports= Notify;
