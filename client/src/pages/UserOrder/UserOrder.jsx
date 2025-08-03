import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux'

const UserOrder = () => { 
  const user = useSelector((state) => state.user)

  const fetchMyOrder = async () => {
      const res = await OrderService.getOrderDetails(user?.access_token, user?.id)
      return res.data
  }
  
  const queryOrder = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: fetchMyOrder,
    enabled: !!user?.access_token && !!user?.id 
  })

  const {data} = queryOrder

  console.log(data)

  return (
     <div>OrderUser Page</div>
  )

}

export default UserOrder
