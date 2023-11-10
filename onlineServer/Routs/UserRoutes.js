const express = require('express')
const router = express.Router(); 
const {HomepageData,userRegistration,userLogin} =  require('../Controllers/UserConrtoller')

router.route('/').get(HomepageData)
router.route('/UserRegistration').post(userRegistration)
router.route('/userLogin').post(userLogin)


module.exports = router;