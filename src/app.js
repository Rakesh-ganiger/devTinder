const express=require("express");
const connectDb = require("./config/database");
const cookieParser=require("cookie-parser")
const app=express()



app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/" , authRouter)
app.use("/" , profileRouter)
app.use("/" , requestRouter)

 
connectDb().then(() => {
    console.log("database connected established")
    app.listen(7777,()=>{
        console.log("server created suceesfully")
    })
    
}).catch(() => {
    console.log("database cannot be connected")
    
});

