const express=require("express");
const connectDb = require("./config/database");
const User=require("./models/user")
const app=express()


app.post("/signup",async(req,res)=>{
    // const userobj={
    //     firstName:"Rakesh",
    //     lastName:"Ganiger",
    //     gmail:"rakesh@123.com",
    //     password:"rakesh@123"
    // }

    const user=new User({
            firstName:"Virat",
            lastName:"Kohli",
            email:"Virat@123.com",
            password:"Virat@123"

    });
    try {
        await user.save();
        res.send("data send sucess fully")
        
    } catch (error) {
        res.status(401).send("error in database"+ error.message)     
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

