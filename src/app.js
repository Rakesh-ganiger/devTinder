const express=require("express");
const connectDb = require("./config/database");
const User=require("./models/user")
const app=express()


app.use(express.json())
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

    const user=new User(req.body);
try {
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

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId
    const data=req.body
    try {
        // const users=await User.findByIdAndUpdate(userId,data)
        const users=await User.findByIdAndUpdate(userId,data,{returnDocument: "after",runValidators:true})
        console.log(users)
        
        res.send("user updated sucessfully")
    } catch (error) {
        res.status(401).send("data not updated" + error.message)
        
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

