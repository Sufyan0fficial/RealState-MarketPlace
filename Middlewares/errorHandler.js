const ErrorHandler = (err,req,res,next)=>{
    res.status(500).send('Unexpected error occured')
}

module.exports = ErrorHandler