const router = require('express').Router()
const {
    Register,
    Login,
    GoogleAuth
} = require('../Controllers/auth')

router.route('/signup').post(Register)
router.route('/signin').post(Login)
router.route('/google').post(GoogleAuth)


module.exports = router