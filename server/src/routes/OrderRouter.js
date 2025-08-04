const express = require('express')
const router = express.Router()
const {authMiddleWare} = require('../middleware/authMiddleWare')
const OrderController = require('../controllers/OrderController')

router.post('/create-order',authMiddleWare(),OrderController.createOrder)
router.get('/get-order-details/:id',authMiddleWare({requireOwner: true}),OrderController.getOrderDetails)
router.get('/get-order-by-id/:id',authMiddleWare(),OrderController.getOrderById)
router.delete('/cancel-order',authMiddleWare(),OrderController.cancelOrder)

module.exports = router