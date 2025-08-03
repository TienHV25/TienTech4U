const express = require('express')
const router = express.Router()
const {authMiddleWare} = require('../middleware/authMiddleWare')
const OrderController = require('../controllers/OrderController')


router.post('/create-order',authMiddleWare({requireOwner: true}),OrderController.createOrder)
router.get('/get-order-details/:id',authMiddleWare({requireOwner: true}),OrderController.getOrderDetails)

module.exports = router