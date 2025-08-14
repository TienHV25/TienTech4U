import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useDebounce } from '../../hooks/useDebounce'
import { useSelector } from 'react-redux'
import { useQuery } from "@tanstack/react-query"
import {
  WrapperContainer,
  WrapperRow,
  WrapperColNav,
  WrapperColProducts,
  WrapperPagination
} from './style'

const TypeProductPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [products, setProducts] = useState([])
  const searchProduct = useSelector((state) => state.product.search)
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1
  })

  const seaerchDebounce = useDebounce(searchProduct, 1000)

  const handleNavigateType = (type) => {
    navigate(`/product/${type?.normalize('NFD')
      ?.replace(/[\u0300-\u036f]/g, '')
      ?.replace(/ /g, '_')}`, { state: type })
  }

  const fetchProductType = async (type, page, limit) => {
    const res = await ProductService.getAllProductsType(type, page, limit)
    if (res?.status === 'OK') {
      setProducts(res?.data)
      setPanigate({ ...panigate, total: res?.totalProduct })
    }
  }

  const fetchProductAll = async (context) => {
    if (searchProduct?.length > 0) {
      const limit = context?.queryKey && context?.queryKey[1]
      const search = context?.queryKey && context?.queryKey[2]
      const res = await ProductService.getAllProducts(search, limit)
      setProducts(res?.data)
      return res
    }
  }

  const { data: productsSearch } = useQuery({
    queryKey: ['productsSearch', panigate?.limit, seaerchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
    enabled: !!seaerchDebounce
  })

  useEffect(() => {
    if (state && searchProduct?.length === 0) {
      fetchProductType(state, panigate.page, panigate.limit)
    }
  }, [state, searchProduct, panigate.page])

  useEffect(() => {
    if (searchProduct.length > 0 && productsSearch?.data?.length > 0) {
      const firstProduct = productsSearch.data[0];
      const productType = firstProduct?.type;

      if (productType && productType !== state) {
        handleNavigateType(productType)
        setProducts(productsSearch.data)
      }
    }
  }, [productsSearch, searchProduct])

  const onChange = (current, pageSize) => {
    setPanigate({
      ...panigate,
      page: current - 1,
      limit: pageSize
    })
  }

  return (
    <WrapperContainer>
      <WrapperRow>
        <WrapperColNav span={4}>
          <NavBarComponent />
        </WrapperColNav>
        <WrapperColProducts span={20}>
          {products?.map((product, index) => (
            <CardComponent
              key={product._id || `product-${index}`}
              id={product?._id}
              countInStock={product.countInStock}
              description={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              type={product.type}
              selled={product.selled}
              discount={product.discount}
            />
          ))}
          <WrapperPagination>
            <Pagination
              showQuickJumper
              current={panigate?.page + 1}
              pageSize={panigate?.limit}
              total={panigate?.total}
              onChange={onChange}
            />
          </WrapperPagination>
        </WrapperColProducts>
      </WrapperRow>
    </WrapperContainer>
  )
}

export default TypeProductPage
