const Order = require("../models/OrderProduct")
const bcrypt = require("bcrypt")
const jwtService = require('../services/jwtService')

const createOrder = async (newOrder) => {
    try {
        const createdOrder = await Order.create(newOrder)

        return {
            status: 'OK',
            message: 'Tạo đơn hàng thành công',
            data: createdOrder
        }
    } catch (e) {
        console.log('Lỗi tạo đơn hàng:', e)
        return {
            status: 'ERR',
            message: 'Tạo đơn hàng thất bại',
            error: e.message
        }
    }
}

module.exports = { createOrder }

