const router = require('express').Router()
const multer = require('multer')
const storage = require('../utils/createStorage')

const uploads = multer({storage})

const {
    CreateListing,
    getListings,
    deleteListing,
    getListing,
    updateListing,
    filterListings
} = require('../Controllers/listing')
const {verifyUser} = require('../utils/verifyUser')

router.route('/create').post(verifyUser,uploads.array('images', 6),CreateListing)
router.route('/filter').get(filterListings)
router.route('/:id').get(verifyUser,getListings)
router.route('/delete/:id').delete(verifyUser,deleteListing)
router.route('/get/:id').get(getListing)
router.route('/update/:id').patch(verifyUser,uploads.array('images', 6),updateListing)


module.exports = router