const express = require('express')
const router = express.Router(); 
const {HomepageData,userRegistration,userLogin,AddToCart,getCartItem} =  require('../Controllers/UserConrtoller')

router.route('/').get(HomepageData)
router.route('/UserRegistration').post(userRegistration)
router.route('/userLogin').post(userLogin)
router.route('/AddToCart').post(AddToCart);
router.route('/getCartItem').post(getCartItem);

module.exports = router;