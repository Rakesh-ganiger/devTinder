const express= require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest= require("../models/connectionRequest");
const userRouter= express.Router();
const USER_SAFE_DATA= "firstName lastName age gender photourl about";
userRouter.get("/user/request/recieved", userAuth, async(req,res) => {
    try {
        const loggedInUser= req.user;
        const connectionRequests= await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)
        res.json({message:" data fetched sucessfully", connectionRequests})
        
    } catch (error) {
        res.status(400).send("ERROR!" + error.message)
        
    }

})
userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                { fromUserId: loggedInUser, status:"accepted"},
                { toUserId: loggedInUser, status:"accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)
        const data= connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }else{
                return row.fromUserId;
            }
        })
        res.json({data})
        
    } catch (error) {
        res.status(400).json("ERROR!" + error.message)
        
    }
})

module.exports=userRouter;