const Product = require("../models/ProductModel")
const jwtService = require('../services/jwtService')

const createProduct = async (newProduct) => {
    const { name,image,type,price,countInStock,rating,description } = newProduct
    try {
        const checkproduct = await Product.findOne({ name: name })
        if (checkproduct) {
            return {
                status: 'ERR',
                message: 'Product has already!'
            }
        }
        const createdProduct = await Product.create({
            name,
            image,
            type,
            price,
            countInStock,
            rating,
            description
        })

        if (createdProduct) {
            return {
                status: 'OK',
                message: 'SUCCESS',
                data: createdProduct
            }
        }
    } catch (e) {
        throw e 
    }
}

const getProductAll = async (limit,page,sort,filter) => {
    try {
        const totalProduct = await Product.countDocuments()
        if (sort) {
            const objectSort = {}
            objectSort[sort[1]] = sort[0]
            const productSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
            return {
                status: 'OK',
                message: 'Get sort product successfully',
                data: productSort,
                totalProduct: totalProduct,
                page: page + 1,
                totalPage: Math.ceil(totalProduct/limit)       
            }
        }
        if (filter) {
            const label = filter[0]
            const filterCondition = {[label]: { '$regex': filter[1],'$options': 'i' }}
            const productFilter = await Product.find(filterCondition).limit(limit).skip(page * limit)
            if(productFilter) {
                const totalProductAfterFilter = await Product.countDocuments(filterCondition)
                return {
                    status: 'OK',
                    message: 'Get filter product successfully',
                    data: productFilter,
                    totalProduct: totalProductAfterFilter,
                    page: page + 1,
                    totalPage: Math.ceil(totalProductAfterFilter/limit)       
                }
            }
        }
        const productAll = await Product.find().limit(limit).skip(page * limit)
        if (!productAll) {
            return {
                status: 'ERR',
                message: 'Product not exists'
            }
        }
        return {
            status: 'OK',
            message: 'Get all product successfully',
            data: productAll,
            totalProduct: totalProduct,
            page: page + 1,
            totalPage: Math.ceil(totalProduct/limit)        
        }
    } catch (e) {
        throw e 
    }
}

const getProductDetail = async (productID) => {
    try {
        const product = await Product.findOne({_id:productID})
        if (!product) {
            return {
                status: 'ERR',
                message: 'Product not exists'
            }
        }
        return {
            status: 'OK',
            message: 'Get product successfully',
            data: product
        }
    } catch (e) {
        throw e 
    }
}

const updateProduct = async (productID,data) => {
    try {
        
        const checkProduct = await Product.findOne({ _id:productID })
        if (!checkProduct) {
            return {
                status: 'ERR',
                message: 'Product not exists'
            }
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            productID, 
            data,
            { new: true }
        )
        if(!updatedProduct) {
            return {
                status: 'ERR',
                message: 'Failed to update product'
            }
            }
        return {
            status: 'OK',
            message: 'Product updated successfully',
            data: updatedProduct
        }
    } catch (e) {
        throw e 
    }
}

const deleteProduct = async (productID,data) => {
    try {      
        const checkProduct = await Product.findOne({ _id:productID })
        if (!checkProduct) {
            return {
                status: 'ERR',
                message: 'Product not exists'
            }
        }
        const deleteProduct = await Product.findByIdAndDelete(
            productID, 
            data
        )
        if(!deleteProduct ) {
            return {
                status: 'ERR',
                message: 'Failed to delete product'
            }
            }
        return {
            status: 'OK',
            message: 'Product delete successfully'
        }
    } catch (e) {
        throw e 
    }
}

const deleteProductMany = async (ids) => {
   try {    
        const deleteProductMany = await Product.deleteMany(
            {
             _id: ids
            }
        )
        if(!deleteProductMany ) {
            return {
                status: 'ERR',
                message: 'Failed to delete products'
            }
            }
        return {
            status: 'OK',
            message: 'Products delete successfully'
        }
    } catch (e) {
        throw e 
    }
}

const getAllType = async () => {
    try {
        const allType = await Product.distinct('type')
        if (!allType) {
            return {
                status: 'ERR',
                message: 'Type not exists'
            }
        }
        return {
            status: 'OK',
            message: 'Get all type successfully',
            data: allType
        }
    } catch (e) {
        throw e 
    }
}

module.exports = {createProduct,getProductAll,getProductDetail,updateProduct,deleteProduct,deleteProductMany,getAllType}

