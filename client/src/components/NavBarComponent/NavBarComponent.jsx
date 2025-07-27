import React, { useState,useEffect } from 'react'
import { WrapperContent, WrapperLableText, WrapperTextValue } from './style'
import * as ProductService from '../../services/ProductService'
import { useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {resetSearchProduct} from "../../redux/slides/productSlide"


const NavBarComponent = () => {
 const [typeProducts,setTypeProducts] = useState([])
 const [pendingType, setPendingType] = useState(null)
 const navigate = useNavigate()
 const dispatch = useDispatch()

 const fetchAllTypeProduct = async () => {
      const res = await ProductService.getAllType()
      if(res?.status === 'OK')
      {
        setTypeProducts(res?.data)
      }
      return res
 }

 const handleNavigateType = (type) => {
   navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_')}`, {
      state: type,
    })
   setTimeout(() => {
     dispatch(resetSearchProduct())
  }, 500) 
  }

 useEffect(() => {
    fetchAllTypeProduct()
 },[])

  return (
    <WrapperContent>
        <WrapperLableText>Danh mục sản phẩm</WrapperLableText>
        {typeProducts.map((item,index) => {
              return(
                <WrapperTextValue key={index} onClick={() => handleNavigateType(item)}>{item}</WrapperTextValue>
              )
        })}
    </WrapperContent>
  )
}

export default NavBarComponent
