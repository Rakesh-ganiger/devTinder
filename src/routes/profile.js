// const express=require("express");

// const profileRouter=express.Router();
// const { userAuth } = require("../middlewares/auth");
// const {validateEditProfileData}=require("../utils/validation")

// profileRouter.get("/profile/view",userAuth, async(req,res)=>{
//     try{
//     const user=req.user;
//     res.send(user);

//     }catch(error){
//          return res.status(404).send("ERROR:" +error.message)
//     }
// })

// // profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
// //     try {
// //         if(!validateEditProfileData(req)){
// //             throw new Error("Invalid edit request")
// //         }
// //         const loggedInUser=req.user;
        
// //         Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
// //         await loggedInUser.save();
// //         res.json({message: `${loggedInUser.firstName} profile updated sucessfully`,
// //             data:loggedInUser})


        
// //     } catch (error) {
// //         res.status(400).send("ERROR" +error.message)
        
// //     }
// // })

// profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
//     try {console.log("Received edit request:", req.body);
//         if (!validateEditProfileData(req)) {
//             throw new Error("Invalid edit request");
//         }

//         const loggedInUser = req.user;

//         Object.keys(req.body).forEach((key) => {
//             if (req.body[key] !== undefined && req.body[key] !== "") {
//                 loggedInUser[key] = req.body[key];
//             }
//         });

//         await loggedInUser.save();

//         res.json({
//             message: `${loggedInUser.firstName}'s profile updated successfully`,
//             data: loggedInUser,
//         });

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });


// module.exports=profileRouter;


const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;