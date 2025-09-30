const router = require('express').Router()
const multer = require('multer')
const storage = require('../utils/createStorage')

const uploads = multer({storage})
// const uploadFiles =  (req,res,next)=>{
//    uploads.array('images',6)
//     console.log('req condition inside uploadFiles middleware',req.body,req.files,req.file)
//   next()
// }

const {
    CreateListing
} = require('../Controllers/listing')
const verifyUser = require('../utils/verifyUser')

router.route('/create').post(verifyUser,uploads.array('images', 6),CreateListing)


module.exports = router