const Order = require("../models/OrderProduct")
const bcrypt = require("bcrypt")
const jwtService = require('../services/jwtService')
const Product = require("../models/ProductModel")
const { sendEmail } = require('./emailService')

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
    
        const orderItemsWithDiscount = await Promise.all(newOrder.orderItems.map(async (item) => {
            const product = await Product.findById(item.product)
            const discountPercent = product?.discount || 0
            const discountAmount = (item.price * discountPercent) / 100
            return {
                ...item,
                discount: discountAmount 
            }
        }))
        await sendEmail({
            receiverEmail: newOrder.shippingAddress.email, 
            customerName: newOrder.shippingAddress.fullName,
            phone: newOrder.shippingAddress.phone,
            orderItems: orderItemsWithDiscount,
            shippingAddress: newOrder.shippingAddress.address,
            paymentMethod: newOrder.paymentMethod,
            shippingMethod: newOrder.shippingMethod,
            shippingPrice: newOrder.shippingPrice,
            totalPrice: newOrder.totalPrice,
            isPaid: newOrder.isPaid,
            isDelivery: newOrder.isDelivery
        })
        

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
        const order = await Order.find({user:userID})
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

const getOrderById = async (orderID) => {
    try {
        const order = await Order.findOne({_id:orderID})
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

const getAllOrder = async () => {
    try {
        const order = await Order.find().select('shippingAddress paymentMethod totalPrice isPaid isDelivered');
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

const cancelOrder = async (orders) => {
    try {  
        for (const item of orders.orderItems) {
            await Product.findOneAndUpdate(
                {
                    _id: item.product
                },
                {
                    $inc: {
                        countInStock: +item.amount,
                        selled: -item.amount
                    }
                },
                { new: true }
            )
        }
        const checkProduct = await Order.findOne({ _id:orders?._id })
        if (!checkProduct) {
            return {
                status: 'ERR',
                message: 'Order not exists'
            }
        }
        const deleteOrder = await Order.findByIdAndDelete(
            orders?._id
        )
        if(!deleteOrder ) {
            return {
                status: 'ERR',
                message: 'Failed to delete order'
            }
            }
        return {
            status: 'OK',
            message: 'Order delete successfully'
        }
    } catch (e) {
        throw e 
    }
}


module.exports = { createOrder,getOrderDetails,getOrderById,cancelOrder,getAllOrder}

