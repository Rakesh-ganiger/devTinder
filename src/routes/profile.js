const express=require("express");

const profileRouter=express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{
    const user=req.user;
    res.send(user);

    }catch(error){
        res.status(404).send("ERROR:" +error.message)
    }
})

module.exports=profileRouter;