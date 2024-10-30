const express = require("express");

const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    
    const allowedStatus=["interested","ignored"];
    if(!allowedStatus.includes(status)){
        return res.status(404).json({message:"Invalid status type " + status})
    }

    //if there is an existing connection request
    const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[{fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}]
    })
    if(existingConnectionRequest){
        return res.status(404).json({message:"already sent a connection request"})
    }
    //cannot send connection request to urself
    // if(fromUserId.equals(toUserId)){
    //             throw new Error("cannot send connection request to Yourself")
    //         }

    const toUser=await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message:"User Not found"})
    }

    
    const connectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    })
    const data=await connectionRequest.save();
    res.json({message: 
        req.user.firstName + " is " + status + " in " +toUser.firstName
    })
}
catch(error){
    res.status(400).send("ERROR : " + error.message)
}
})

module.exports=requestRouter;

