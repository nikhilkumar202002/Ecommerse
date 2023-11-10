const express = require('express')
const router = express.Router();

<<<<<<< HEAD
const { addproduct,test ,getProduct} = require('../Controllers/AdminController');
router.post('/add-product', addproduct);
router.get('/test',test)
router.get('/allproducts',getProduct)
=======
const { addproduct,test } = require('../Controllers/AdminController');
router.post('/add-product', addproduct);
router.get('/test',test)
>>>>>>> e345bf993f1fbdefa97751d486b10eda1c829420
module.exports = router;    