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

module.exports = updatedUser