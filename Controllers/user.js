const asyncWrapper = require("../Middlewares/asyncWrapper")
const customErrorHandler = require("../utils/error")
const User = require('../Models/user.model')
const bcryptjs = require('bcryptjs')

const updatedUser = asyncWrapper(async (req,res,next)=>{
    const password = req.body?.password
    if(password){
        var hashedPassword = bcryptjs.hashSync(password,10)
    }
    const isValidUser = req.user.id === req.params.id
    if(!isValidUser){
        return next(customErrorHandler(403,'Unauthorized User is trying to Update the Profile'))
    }
    
    const updatedProfile = await User.findOneAndUpdate({_id:req.params.id}, {...req.body,password:hashedPassword}, {new:true,runValidators:true})
    console.log('updated profile data is',updatedProfile)
    const {password:pass, ...rest} = updatedProfile._doc
    res.status(200).json({message:'Profile Updated successfully',data:rest})
})

const deleteUser = asyncWrapper(async (req,res,next)=>{
    const validUser = req.user.id == req.params.id
    if(!validUser){
        return next(customErrorHandler(403,'Unauthorized user is trying to delete account'))
    }
    await User.findOneAndDelete({_id:req.params.id})
    res.clearCookie('access_token')
    return res.status(200).json({message:'User successfully deleted'}) 
})

const getUser = asyncWrapper(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(customErrorHandler(404,'Landlord user not found'))
    }
    else
    {
        return res.status(200).json({success:true, data:user})
    }
})

module.exports = {
    updatedUser,
    deleteUser,
    getUser
}