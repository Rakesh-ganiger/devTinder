const express=require("express");
const app=express();


// app.use("/user", (req,res)=>{
//     res.send("hahahahahaah")
// })

app.patch("/user",(req,res)=>{
    res.send("fatch data sucessfully")
})

app.get("/user",(req,res)=>{
    res.send({firstname:"Rakesh",lastname:"ganiger"})
})
app.post("/user",(req,res)=>{
    res.send("data sucessfully saved to database")
})

app.delete("/user",(req,res)=>{
    res.send("data deleted sucessfully")
})


app.use("/hello",(req,res)=>{
    res.send("hello from the rakesh how are u")
})

// app.use("/",(req,res)=>{
//     res.send("Namaste node")
// })




app.listen(7777,()=>{
    console.log("server created suceesfully")
})