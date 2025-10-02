const router = require('express').Router()
const {
    updatedUser,
    deleteUser,
    getUser
} = require('../Controllers/user')
const verifyUser = require('../utils/verifyUser')



router.route('/update/:id').patch(verifyUser,updatedUser)
router.route('/delete/:id').delete(verifyUser,deleteUser)
router.route('/:id').get(verifyUser,getUser)



module.exports = router