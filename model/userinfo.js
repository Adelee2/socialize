const mongoose = require ('mongoose');

const userinfoSchema = new mongoose.Schema(
    {
      avatar: {
        type: String,
      },
      location: {
        type: String,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      posts:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Post'
        }
    ],
    feeds:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Feed'
        }
    ],
    
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'User'
        }
    ],
    groups:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Group"
        }
    ],
    notify:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Notification'

        }
    ]
    },
    { timestamps: true },
  );
   
  const UserInfo = mongoose.model('UserInfo', userinfoSchema);

  module.exports= UserInfo