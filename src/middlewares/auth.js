const adminAuth=(req,res,next)=>{
    console.log("get the data sucessfully")
    const token="ABC"
    const isAdminAuthorised=token ==="ABC"
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised request")
    }
    else{
        next();
    }
}
const userAuth=(req,res,next)=>{
    console.log("get the data sucessfully")
    const token="ABCfsdvf"
    const isAdminAuthorised=token ==="ABC"
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised request")
    }
    else{
        next();
    }
}

module.exports={
    adminAuth,
    userAuth,
}