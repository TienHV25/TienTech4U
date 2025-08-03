require('dotenv').config()
OrderService = require('../services/OrderService')

const createOrder = async(req,res) => {
    try {
       const {paymentMethod, itemPrice, shippingPrice, totalPrice, fullName, address, phone, ...rest} = req.body

       if (!paymentMethod || !itemPrice || !shippingPrice || !totalPrice || !fullName || !address || !phone) {
         return res.status(400).json({
           status:'ERR',
           message: 'Đây là thông tin bắt buộc'
         })
       }

       const shippingAddress = { fullName, address, phone }

       const response = await OrderService.createOrder({
         ...rest,
         paymentMethod,
         itemPrice,
         shippingPrice,
         totalPrice,
         shippingAddress
       })

      if (response.status === 'ERR') {
          return res.status(400).json({
              status: 'ERR',
              message: response.message
          })
      }

       return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const getOrderDetails = async (req,res) => {
  try {
    const userID = req.params.id
    if(!userID){
      return res.status(400).json({
        status: 'ERR',
        message: 'The user id is required'
      })
    }
    const productGetDetail = await OrderService.getOrderDetails(userID)
    return res.status(200).json(productGetDetail)
  } catch (error) {
    return res.status(500).json({message:e})
  }
}

module.exports = {createOrder,getOrderDetails}