const express = require('express')
const router = express.Router();

const { addproduct,test ,getProduct} = require('../Controllers/AdminController');
router.post('/add-product', addproduct);
router.get('/test',test)
router.get('/allproducts',getProduct)
module.exports = router;    