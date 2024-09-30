const express=require("express");
const connectDb = require("./config/database");
const User=require("./models/user")
const {validateSignupData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const app=express()



app.use(express.json())
app.use(cookieParser())
app.post("/signup",async(req,res)=>{

    // console.log(req.body)
    // const userobj={
    //     firstName:"Rakesh",
    //     lastName:"Ganiger",
    //     gmail:"rakesh@123.com",
    //     password:"rakesh@123"
    // }

    // const user=new User({
    //         firstName:"Virat",
    //         lastName:"Kohli",
    //         email:"Virat@123.com",
    //         password:"Virat@123"

    // });
    // try {
    //     await user.save();
    //     res.send("data send sucess fully")
        
    // } catch (error) {
    //     res.status(401).send("error in database"+ error.message)     
    // }
    // without sending the hard coaded data we will send the dynamic data by using this below method and also we use middleware to handle json data the middleware is app.use(express.json())

    // const user=new User(req.body);
    try {
    validateSignupData(req)
    const{firstName,lastName,email,password}=req.body
    const passwordHash= await bcrypt.hash(password,10)
    console.log(password)
    const user=new User({
        firstName,
        lastName,
        email,
        password:passwordHash
    })

    

    await user.save();
    res.send("data send sucess fully")
    
} catch (error) {
    res.status(401).send("error in database"+ error.message)     
}
     
})
// app.get("/user",async(req,res)=>{
//     const usermail=req.body.email;
//     try {
//         const users= await User.find({email:usermail})
//         if(users.length===0){
//             res.status(404).send("user not found")
//         }
//         else{
//         res.send(users)
//         }
        
//     } catch (error) {
//         res.status(404).send("something went wrong")
        
//     }
    

// })

app.post("/login",async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user){
            throw new Error("Email is not registerd")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            const token=await jwt.sign({_id:user._id}, "Rakesh@2002")
            console.log(token)
            res.cookie("token",token)
            res.send("Login sucessfully")
        }else{
            throw new Error("Password is not correct")
        }
        
    } catch (error) {
        res.status(404).send("ERROR: " +error.message)
        
    }
})
app.get("/profile",async(req,res)=>{
    try{
        const cookies=req.cookies;

    const {token}=cookies;
    if(!token){
        throw new Error("Invalid token")
    }
    const decodedMessage=await jwt.verify(token,"Rakesh@2002")
    const { _id}=decodedMessage;
    console.log(_id)
    const user=await User.findById(_id);
    if(!user){
        throw new error("user is not exist")
    }

    console.log(cookies)
    
    res.send(user);

    }catch(error){
        res.status(404).send("ERROR:" +error.message)
    }
})


app.get("/user",async(req,res)=>{
    const usermail=req.body.email
    try {
        const users=await User.findOne({email:usermail})
        if(!users){
            res.status(401).send("something wrong:")
        }
        else{
            res.send(users)
        }
    } catch (error) {
        res.status(401).send("something wrong:")
        
    }

})
//getting the all the data we can use the bellow approach
app.get("/feed", async(req,res)=>{
    
    
    try {
        const users=await User.find()
        res.send(users)
        
    } catch (err) {
        res.status(404).send("data is not find")
        
    }
})

app.delete("/user",async(req,res)=>{
    const userId=req.body._id
    try {
        // const users= await User.findByIdAndDelete(userId);
        const users=await User.findByIdAndDelete({_id:userId})
        res.send(users)
        
    } catch (error) {
        res.status(401).send("not deleted")
        
    }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId
    const data=req.body

    try { 
        const ALLOWED_UPDATES=["userId","photourl","about","gender","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("update not allowed")
        }
        if(data?.skills.length>10){
            throw new Error("skills not more than 10" +error.message)
        }
        // const users=await User.findByIdAndUpdate(userId,data)
        const users=await User.findByIdAndUpdate(userId,data,{returnDocument: "after",runValidators:true})
        console.log(users)
        
        res.send("user updated sucessfully")
    } catch (error) {
        res.status(401).send("data not updated " + error.message )
        
    }
})

connectDb().then(() => {
    console.log("database connected established")
    app.listen(7777,()=>{
        console.log("server created suceesfully")
    })
    
}).catch(() => {
    console.log("database cannot be connected")
    
});

