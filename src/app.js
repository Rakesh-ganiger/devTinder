const express=require("express");
const app=express();

app.use("/test",(req,res)=>{
    res.send("hello hello hello ")
})
app.use("/hello",(req,res)=>{
    res.send("hello from the rakesh how are u")
})

app.use((req,res)=>{
    res.send("hello from the server")
})

app.listen(7777,()=>{
    console.log("server created suceesfully")
})