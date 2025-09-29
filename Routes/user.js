const router = require('express').Router()
const {
    updatedUser,
    deleteUser
} = require('../Controllers/user')
const verifyUser = require('../utils/verifyUser')



router.route('/update/:id').patch(verifyUser,updatedUser)
router.route('/delete/:id').delete(verifyUser,deleteUser)



module.exports = router