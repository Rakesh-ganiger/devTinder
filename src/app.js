const express=require("express");
const connectDb = require("./config/database");
const cookieParser=require("cookie-parser")
const app=express()
const cors=require("cors")


app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies
}));
// app.use(cors())
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/" , authRouter)
app.use("/" , profileRouter)
app.use("/" , requestRouter)
app.use("/" , userRouter)

 
connectDb().then(() => {
    console.log("database connected established")
    app.listen(7777,()=>{
        console.log("server created suceesfully")
    })
    
}).catch(() => {
    console.log("database cannot be connected")
    
});

