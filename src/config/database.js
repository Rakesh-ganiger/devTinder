const mongoose=require("mongoose")

const connectDb = async() => {
    await mongoose.connect("mongodb+srv://RakeshG:Rakesh2002@cluster0.fenio.mongodb.net/devTinder")
    
}

module.exports=connectDb;


