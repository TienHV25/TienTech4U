import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetail = () => {
  const {id} = useParams()
  return (
    <div style={{padding:'20px 120px',background:'#efefef',height:'800px'}}>
     <ProductDetailsComponent idProduct={id}/>
    </div>
  )
}

export default ProductDetail
