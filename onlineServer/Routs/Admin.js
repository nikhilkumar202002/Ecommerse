const express = require('express')
const router = express.Router();

const { 
addproduct,
test ,
getProduct,
getOrders,
GetUser,
shippingStatus
} = require('../Controllers/AdminController');

router.post('/add-product', addproduct);
router.get('/test',test)
router.get('/allproducts',getProduct)
router.post('/add-product', addproduct);
router.get('/test',test);
router.route('/getorders').get(getOrders)
router.route('/GetUser').post(GetUser)
router.route('/shippingStatus').post(shippingStatus)


module.exports = router;    