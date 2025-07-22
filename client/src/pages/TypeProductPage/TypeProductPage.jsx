import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'


const TypeProductPage = () => {
  const {state} = useLocation()
  const [products,setProducts] = useState([])
  const fetchProductType = async(type) => {
      const res = await ProductService.getAllProductsType(type)
      if(res?.status === 'OK'){
        setProducts(res?.data)
      }
  }

  useEffect(() => {
    if(state){
      fetchProductType(state)
    }
    
  },[])

  const onChange = () => {}

  return (
    <div style={{backgroundColor:'#efefef',height:'calc(100vh - 64px)'}} >
    <Row style={{padding:'0 120px',backgroundColor:'#efefef',flexWrap:'nowrap',paddingTop:'10px'}}>
      <Col span={4} style={{backgroundColor:'#fff',marginRight:'10px',padding:'10px',borderRadius:'6px',height:'fit-content'}}>
        <NavBarComponent />
      </Col>
      <Col span={20} style={{display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
       {products?.map((product,index) => {
          return(
           <CardComponent 
              key={product._id || `product-${index}`} 
              id={product?._id } 
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
          )
        })}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom:'20px'}}>
            <Pagination
                showQuickJumper
                defaultCurrent={2}
                total={500}
                onChange={onChange}
            />
        </div>
      </Col>
    </Row>
    </div>
  )
}

export default TypeProductPage
