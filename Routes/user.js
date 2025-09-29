const router = require('express').Router()
const updateUser = require('../Controllers/user')
const verifyUser = require('../utils/verifyUser')



router.route('/update/:id').patch(verifyUser,updateUser)


module.exports = router