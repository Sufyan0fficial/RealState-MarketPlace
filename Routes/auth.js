const router = require('express').Router()
const {
    Register,
    Login
} = require('../Controllers/auth')

router.route('/signup').post(Register)
router.route('/signin').post(Login)


module.exports = router