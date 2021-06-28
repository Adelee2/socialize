const mongoose = require ('mongoose');

const likeSchema = new mongoose.Schema(
    {
      togglelike: {
        type: Boolean,
        default: true,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      postfeedstoryid:{type:mongoose.Schema.Types.ObjectId,ref:'Post'}
    },
    { timestamps: true },
  );
   
  const Likes = mongoose.model('Likes', likeSchema);

  module.exports= Likes;
