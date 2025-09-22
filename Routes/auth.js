const router = require('express').Router()
const {
    Register
} = require('../Controllers/auth')

router.route('/signup').post(Register)


module.exports = router