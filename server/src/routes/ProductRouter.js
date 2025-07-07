const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const {authMiddleWare} = require('../middleware/authMiddleWare')

router.post('/create-product',ProductController.createProduct)
router.get('/get-product-all',ProductController.getProductAll)
router.get('/get-product-detail/:id',ProductController.getProductDetail)
router.put('/update-product/:id',ProductController.updateProduct)
router.delete('/delete-product/:id',ProductController.deleteProduct)

router.post('/delete-many',ProductController.deleteMany)

module.exports = router