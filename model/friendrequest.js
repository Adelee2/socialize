const mongoose = require ('mongoose');

const friendreqSchema = new mongoose.Schema(
  {
    friendrequestfrom:{
        type: mongoose.Schema.Types.ObjectId,ref:'User'
        },
    friendrequestto:{
        type: mongoose.Schema.Types.ObjectId,ref:'User'
    },
    accept:{
        type: Boolean,
        default:false
    }
  },
  { timestamps: true },
);

const FriendRequest = mongoose.model('FriendRequest', friendreqSchema);
 
module.exports= FriendRequest;
