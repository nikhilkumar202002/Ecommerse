const express = require('express')
const router = express.Router(); 
const {HomepageData,userRegistration} =  require('../Controllers/UserConrtoller')

router.route('/').get(HomepageData)
router.route('/UserRegistration').post(userRegistration)


module.exports = router;