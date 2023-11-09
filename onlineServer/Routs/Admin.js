const express = require('express')
const router = express.Router();

const { addproduct,test } = require('../Controllers/AdminController');
router.post('/add-product', addproduct);
router.get('/test',test)
module.exports = router;    