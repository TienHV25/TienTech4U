require('dotenv').config()
ProductService = require('../services/ProductService')


const createProduct = async(req,res) => {
    try {
        const { name,image,type,price,countInStock,rating,description } = req.body
        if(!name || !image || !type || !price || !countInStock || !rating || !description )
        {
            return res.status(400).json({
                status:'ERR',
                message: 'The input is required'
            })
        }
        const productRes = await ProductService.createProduct(req.body)
        return res.status(200).json(productRes)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const getProductAll = async(req,res) => {
    try {
        const {limit,page,sort,filter} = req.query
        const productGetAll = await ProductService.getProductAll(Number(limit) || 30,Number(page) || 0,sort,filter)
        return res.status(200).json(productGetAll)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const getProductDetail = async(req,res) => {
    try {
        const productID = req.params.id
        const productGetDetail = await ProductService.getProductDetail(productID)
        return res.status(200).json(productGetDetail)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const updateProduct = async(req,res) => {
    try {
        const productID = req.params.id
        const productUpdate =  await ProductService.updateProduct(productID,req.body)
        return res.status(200).json(productUpdate)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const deleteProduct = async(req,res) => {
    try {
        const productID = req.params.id
        const productDelete =  await ProductService.deleteProduct(productID,req.body)
        return res.status(200).json(productDelete)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

const deleteMany = async(req,res) => {
    try {
        const ids = req.body
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const productDeleteMany =  await ProductService.deleteProductMany(ids)
        return res.status(200).json(productDeleteMany)
    } catch (e) {
        return res.status(500).json({message:e})
    }
}

module.exports = {createProduct,getProductAll,getProductDetail,updateProduct,deleteProduct,deleteMany}