const express= require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest= require("../models/connectionRequest");
const User = require("../models/user");
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

userRouter.get("/feed",userAuth,async(req,res)=>{
    try {
        const loggedInUser= req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit
        const skip=(page-1) * limit;



        const connectionRequests= await ConnectionRequest.find({
            $or:[{fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

    const hiddenUserFromFeed = new Set();
    connectionRequests.forEach((req)=>{
        hiddenUserFromFeed.add(req.fromUserId.toString()),
        hiddenUserFromFeed.add(req.toUserId.toString())
    });
    const users = await User.find({
        $and: [{
            _id: { $nin: Array.from(hiddenUserFromFeed)}},
           {_id: { $ne:loggedInUser._id}}]
    }).select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)

    res.json({data : users})
    } catch (error) {
        res.status(400).json("ERROR!" +error.message)
    }
})

module.exports=userRouter;