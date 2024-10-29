const express = require("express");

const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user=req.user;
    console.log("sending a connection request")
    res.send(user.firstName + "sent the connection request")
})

module.exports=requestRouter;

