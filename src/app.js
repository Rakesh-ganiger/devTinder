const express=require("express");
const app=express();


const {adminAuth,userAuth}=require("./middlewares/auth")
app.use("/admin",adminAuth)


app.get("/user",userAuth, (req,res)=>{
    res.send("user data sent")

})

app.get("/admin/getAllData", (req,res)=>{
    res.send("get the user data")

})

app.get("/admin/deleteUser",(req,res)=>{
   res.send("get the deleted data")
})



app.listen(7777,()=>{
    console.log("server created suceesfully")
})