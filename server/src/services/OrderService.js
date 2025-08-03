const Order = require("../models/OrderProduct")
const bcrypt = require("bcrypt")
const jwtService = require('../services/jwtService')
const Product = require("../models/ProductModel")

const createOrder = async (newOrder) => {
    const { orderItems } = newOrder;

    try {
        for (const item of orderItems) {
            const productCheck = await Product.findOneAndUpdate(
                {
                    _id: item.product,
                    countInStock: { $gte: item.amount }
                },
                {
                    $inc: {
                        countInStock: -item.amount,
                        selled: +item.amount
                    }
                },
                { new: true }
            )

            if (!productCheck) {
                return {
                    status: 'ERR',
                    message: `Sản phẩm ${item.name} không đủ số lượng hàng tồn kho`
                }
            }
        }

       
        const createdOrder = await Order.create(newOrder)

        return {
            status: 'OK',
            message: 'Tạo đơn hàng thành công',
            data: createdOrder
        }

    } catch (e) {
        console.error('Lỗi tạo đơn hàng:', e);
        return {
            status: 'ERR',
            message: 'Tạo đơn hàng thất bại',
            error: e.message
        }
    }
}

const getOrderDetails = async (userID) => {
    try {
        const order = await Order.findOne({user:userID})
        if (!order) {
            return {
                status: 'ERR',
                message: 'Order not exists'
            }
        }
        return {
            status: 'OK',
            message: 'Get order successfully',
            data: order
        }
    } catch (e) {
        throw e 
    }
}

module.exports = { createOrder,getOrderDetails }

