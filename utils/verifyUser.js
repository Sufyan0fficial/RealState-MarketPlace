const customErrorHandler = require("./error")
const jwt = require('jsonwebtoken')

const verifyUser = (req,res,next)=>{
    console.log('request received')
    console.log('param id is',req.params.id)
    const token = req.cookies.access_token
    if(!token){
        return next(customErrorHandler(404,'Unauthorized User'))
    }
    jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,user)=>{
        if(err){
            return next(customErrorHandler(403,"ForBidden"))
        }
        req.user = user

        next()
        
    })
}

module.exports = verifyUser