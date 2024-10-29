const validator=require("validator")

const validateSignupData=(req)=>{
    const{firstName,lastName,email,password}=req.body

    if(!firstName ||!lastName){
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter a valid Email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
}
const validateEditProfileData=(req)=>{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "gender",
        "email",
        "about",
        "photourl",
        "age",
        "skills"]
    const isEditAllowed=Object.keys(req.body).every((field)=>
        allowedEditFields.includes(field)
);
return isEditAllowed;

}
module.exports={
    validateSignupData,
    validateEditProfileData
}