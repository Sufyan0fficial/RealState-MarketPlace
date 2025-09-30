const router = require('express').Router()
const {
    Register,
    Login,
    GoogleAuth,
    signOUt
} = require('../Controllers/auth')

router.route('/signup').post(Register)
router.route('/signin').post(Login)
router.route('/google').post(GoogleAuth)
router.route('/signout').get(signOUt)


module.exports = router