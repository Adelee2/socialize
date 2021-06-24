const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
        type:String,
        unique: true,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    token:{
      type:String
    },
    isActive:{
      type:Boolean,
      default:false
    },
    avatar:{
      type:String
    },
    userinfo:{
        type: mongoose.Schema.Types.ObjectId,ref:'UserInfo'
    },
    
  },
  { timestamps: true },
);

// userSchema.statics.findByLogin = async function (login) {
//     let user = await this.findOne({
//       username: login,
//     });
   
//     if (!user) {
//       user = await this.findOne({ email: login });
//     }
   
//     return user;
//   };
 
const User = mongoose.model('User', userSchema);
 
module.exports= User;
