const router = require('express').Router()
const {
    updatedUser,
    deleteUser,
    getUser
} = require('../Controllers/user')
const {verifyUser} = require('../utils/verifyUser')
const storage = require('../utils/createStorage')
const multer = require('multer')
const uploads  = multer({storage})




router.route('/update/:id').patch(verifyUser,uploads.single('photo'),updatedUser)
router.route('/delete/:id').delete(verifyUser,deleteUser)
router.route('/:id').get(verifyUser,getUser)



module.exports = router