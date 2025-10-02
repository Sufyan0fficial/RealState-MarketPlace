const asyncWrapper = require("../Middlewares/asyncWrapper");
const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const customErrorHandler = require("../utils/error");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const Register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hasshedPassword = bcrypt.hashSync(password,10);
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
  console.log('recieving password is',password)
  const validateUser = await User.findOne({email})
  console.log('user is ',validateUser)
  if(!validateUser){
    return next(customErrorHandler(404,'User not found ! Pleae check your email address'))
  }
  const validatePassword = bcrypt.compareSync(password,validateUser.password)
  console.log('password validation',validatePassword)
  if(!validatePassword){
    return next(customErrorHandler(400,"Invalid Credentials ! Please check your password"))
  }
  const token = jwt.sign({id:validateUser._id},process.env.JWT_SECRET_TOKEN)
  console.log('token is',token)
  const {password:pass, ...rest} = validateUser._doc
  return res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({ message: "Login successful", data:rest });

})


const GoogleAuth = asyncWrapper(async (req,res,next)=>{
  const {name, email, photo } = req.body
  const validateUser = await User.findOne({email})
  if(validateUser){
    const token = jwt.sign({id:validateUser._id},process.env.JWT_SECRET_TOKEN)
    const {password, ...rest} = validateUser._doc
    return res.cookie('access_token',token,{httpOnly:true}).json({data:rest})
  }
  else{
    const password = Math.random().toString(36).slice(-8)
    const hashedPassword = bcrypt.hashSync(password,10)
    const newUser = await User.create({name,email,password:hashedPassword,photo})
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_TOKEN)
    const {password:pass, ...rest} = newUser._doc
    return res.cookie('access_token',token,{httpOnly:true}).json({data:rest})
  }
})

  const signOUt = asyncWrapper(async(req,res,next)=>{
  res.clearCookie('access_token')
  return res.status(200).json({message:'User Signout successfully'})
})

module.exports = {
  Register,
  Login,
  GoogleAuth,
  signOUt
};
