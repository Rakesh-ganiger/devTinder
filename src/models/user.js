const mongoose=require("mongoose")

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
        unique:true
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
        validate(value) {
            if (value.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
                throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
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
const User=mongoose.model("User",UserSchema);
module.exports=User


