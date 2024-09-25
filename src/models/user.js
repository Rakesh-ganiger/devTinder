const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    password:{
        type:String
    }

})
const User=mongoose.model("User",UserSchema);
module.exports=User


