const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        minLength:4,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" enter the correct email");
                
            }
        }
    },
    age:{
        type:Number,
        min:18,
        validate(value){
            if(value<18){
                throw new Error("you are too young");

            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(" enter the correct email");
                
            }
        }
        
       
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender is not valid")
            }
        }
    },
    photourl:{
        type:String,
        default:"https://www.vecteezy.com/vector-art/45711185-male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style"
    },
    about:{
        type:String,
        default:"This is a deafault about user"

    },
    skills:{
        type:[String],
    }

},{timestamps: true})

UserSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"Rakesh@2002",{
        expiresIn:"7d",
    })
    return token;
}
UserSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )
    return isPasswordValid;
}

const User=mongoose.model("User",UserSchema);
module.exports=User


