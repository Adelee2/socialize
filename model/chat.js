const mongoose = require ('mongoose');

const chatSchema = new mongoose.Schema(
    {
      message: 
          {
        type: String
      },
      conversationid:{
        type:String
      },
      from:{
        type: mongoose.Schema.Types.ObjectId,ref:'User'
    },
     to:{
        type: mongoose.Schema.Types.ObjectId,ref:'User'
    },
    },
        { timestamps: true },
  );
   
  const Chat = mongoose.model('Chat', chatSchema);

module.exports= Chat;
