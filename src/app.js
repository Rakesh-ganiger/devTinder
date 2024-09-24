const express=require("express");
const app=express();


app.use("/user", (req,res,next)=>{
    console.log("first handler")
    // res.send("first response")
    next();
},(req,res,next)=>{
    console.log("second handler");
    // res.send("second Response")
    next();
},(req,res,next)=>{
    console.log("third handler");
    // res.send("third Response")
    next();
},(req,res,next)=>{
    console.log("fourth handler");
    res.send("fourth Response")
    next();
})
















// app.patch("/user",(req,res)=>{
//     res.send("fatch data sucessfully")
// })
// app.get(/a/,(req,res)=>{
//     console.log(req.params)
//     res.send({firstname:"Rakesh",lastname:"ganiger"})
// })
// app.post("/ab?c",(req,res)=>{
//     res.send("data sucessfully saved to database")
// })

// app.delete("/user",(req,res)=>{
//     res.send("data deleted sucessfully")
// })


// app.use("/hello",(req,res)=>{
//     res.send("hello from the rakesh how are u")
// })

// app.use("/",(req,res)=>{
//     res.send("Namaste node")
// })




app.listen(7777,()=>{
    console.log("server created suceesfully")
})