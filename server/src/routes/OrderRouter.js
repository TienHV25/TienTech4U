const express = require('express')
const router = express.Router()
const {authMiddleWare} = require('../middleware/authMiddleWare')
const OrderController = require('../controllers/OrderController')


router.post('/create-order',authMiddleWare({requireOwner: true}),OrderController.createOrder)

module.exports = router