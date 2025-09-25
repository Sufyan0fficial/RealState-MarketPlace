const asyncWrapper = require("../Middlewares/asyncWrapper");
const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const customErrorHandler = require("../utils/error");
const jwt = require('jsonwebtoken')

const Register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hasshedPassword = bcrypt.hashSync(password);
  const validateEmail =  await User.findOne({email})
  console.log('validate email is',validateEmail)
  if(validateEmail){
    return next(customErrorHandler(400,"User with provided Email already exist"))
  }
  const data = await User.create({ name, email, password: hasshedPassword });
  return res
    .status(200)
    .json({ message: "User registered Successfully", data: data });
});



const Login = asyncWrapper(
  async (req,res,next)=>{
  const {email, password} = req.body
  const validateUser = await User.findOne({email})
  const validatePassword = bcrypt.compareSync(password,validateUser.password)
  if(!validateUser){
    return next(customErrorHandler(404,'User not found !'))
  }
  if(!validatePassword){
    return next(customErrorHandler(400,"Invalid Credentials"))
  }
  const token = jwt.sign({id:validateUser._id})
  const {password:pass, ...rest} = validateUser
  return res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({ message: "Login successful", data:rest });

})

module.exports = {
  Register,
  Login
};
