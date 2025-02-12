// const validator=require("validator")

// const validateSignupData=(req)=>{
//     const{firstName,lastName,email,password}=req.body

//     if(!firstName ||!lastName){
//         throw new Error("Name is not valid")
//     }
//     else if(!validator.isEmail(email)){
//         throw new Error("Enter a valid Email")
//     }
//     else if(!validator.isStrongPassword(password)){
//         throw new Error("Enter a strong password")
//     }
// }



// const validateEditProfileData = (req) => {
//     const allowedEditFields = [
//         "firstName",
//         "lastName",
//         "gender",
//         "email",
//         "about",
//         "photourl",  // ✅ Ensure correct field name
//         "age",
//         "skills"
//     ];

//     const isEditAllowed = Object.keys(req.body).every((field) =>
//         allowedEditFields.includes(field)
//     );

//     if (!isEditAllowed) {
//         return false;
//     }

//     // Additional validation for specific fields
//     if (req.body.photoUrl && !validator.isURL(req.body.photoUrl)) {
//         throw new Error("Invalid Photo URL");
//     }
//     if (req.body.age && !validator.isNumeric(req.body.age.toString())) {
//         throw new Error("Age must be a number");
//     }

//     return true;
// };

// module.exports = { validateSignupData, validateEditProfileData };
// module.exports={
//     validateSignupData,
//     validateEditProfileData
// }


const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photourl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};