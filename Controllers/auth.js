const asyncWrapper = require('../Middlewares/asyncWrapper')
const User = require('../Models/user.model')

const Register = asyncWrapper( async (req,res)=>{
    const data = await User.create(req.body)
    return res.status(200).json({message:"User registered Successfully", data:data})
})

module.exports = {
    Register
}