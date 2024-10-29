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
const userId=req.body.\_id
try {
// const users= await User.findByIdAndDelete(userId);
const users=await User.findByIdAndDelete({\_id:userId})
res.send(users)

    } catch (error) {
        res.status(401).send("not deleted")

    }

})

app.patch("/user/:userId",async(req,res)=>{
const userId=req.params?.userId
const data=req.body

    try {
        const ALLOWED_UPDATES=["userId","photourl","about","gender","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("update not allowed")
        }
        if(data?.skills.length>10){
            throw new Error("skills not more than 10" +error.message)
        }
        // const users=await User.findByIdAndUpdate(userId,data)
        const users=await User.findByIdAndUpdate(userId,data,{returnDocument: "after",runValidators:true})
        console.log(users)

        res.send("user updated sucessfully")
    } catch (error) {
        res.status(401).send("data not updated " + error.message )

    }

})

// app.get("/user",async(req,res)=>{
// const usermail=req.body.email;
// try {
// const users= await User.find({email:usermail})
// if(users.length===0){
// res.status(404).send("user not found")
// }
// else{
// res.send(users)
// }

// } catch (error) {
// res.status(404).send("something went wrong")

// }

// })
