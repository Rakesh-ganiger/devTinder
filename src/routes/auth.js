const express=require("express");
const authRouter=express.Router();

const bcrypt=require("bcrypt")
const {validateSignupData}=require("../utils/validation")
const User=require("../models/user")

authRouter.post("/signup",async(req,res)=>{

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
authRouter.post("/login",async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user){
            throw new Error("Email is not registerd")
        }
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            const token=await user.getJWT();
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})
            res.send("Login sucessfully")
        }else{
            throw new Error("Password is not correct")
        }
        
    } catch (error) {
        res.status(404).send("ERROR: " +error.message)
        
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout sucessful")
})

module.exports=authRouter;