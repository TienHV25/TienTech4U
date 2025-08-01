const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name:
        {
           type:String,
           required:true,
           unique:true,
        },
        image:
        {
           type:String,
           required:true
        },
        type:
        {
           type:String,
           required:true,
        },
        price:
        {
           type:Number,
           required:true
        },
        countInStock:
        {
           type:Number,
           required:true
        },
        rating:
        {
           type:Number,
           required:true
        },
         discount:
        {
           type:Number,
           required:false
        },
        description:
        {
           type:String,
           required:true,
        },
        selled:
        {
           type:Number,
        }
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product',productSchema)
module.exports = Product