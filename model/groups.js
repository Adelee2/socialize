const mongoose = require ('mongoose');

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }
    ],
//     likes:[
//         {
//             type: mongoose.Schema.Types.ObjectId,ref:'Likes'
//         }
//     ],
//   comments:[
//         {
//             type: mongoose.Schema.Types.ObjectId,ref:'Comment'
//         }
//     ],
//     posts:[
//         {
//             type: mongoose.Schema.Types.ObjectId,ref:'Post'
//         }
//     ]

  },
  { timestamps: true },
);

 
const Group = mongoose.model('Group', groupSchema);
 
module.exports= Group;
