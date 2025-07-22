import React from 'react'
import { WrapperTypeName} from './style'
import { Navigate, useNavigate } from 'react-router-dom'

const TypeProducts = ({name}) => {
  const navigate = useNavigate()
  const handleNavigateType = (type) => {
    navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_')}`,{state: type})
  }
  return (
    <div>
       <WrapperTypeName onClick={() => handleNavigateType(name)}>{name}</WrapperTypeName> 
    </div>
  )
}

export default TypeProducts
