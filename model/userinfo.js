const mongoose = require ('mongoose');

const userinfoSchema = new mongoose.Schema(
    {
      location: {
        type: String,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      posts:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Post'
        }
    ],
    stories:[
        {
            type: mongoose.Schema.Types.ObjectId,ref:'Story'
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