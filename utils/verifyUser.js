const customErrorHandler = require("./error")
const jwt = require('jsonwebtoken')

const verifyUser = (req,res,next)=>{

    const token = req.cookies.access_token
    console.log('token is',token)
    if(!token){
        return next(customErrorHandler(401,'Unauthorized User'))
    }
    jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,user)=>{
        if(err){
            return next(customErrorHandler(403,"ForBidden"))
        }
        req.user = user

        next()
        
    })
}

module.exports = {
    verifyUser
}