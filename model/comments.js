const mongoose = require ('mongoose');

const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      postfeedstoryid:{type:mongoose.Schema.Types.ObjectId,ref:'Post'}
    },
    { timestamps: true },
  );
   
  const Comment = mongoose.model('Comment', commentSchema);

module.exports= Comment;
