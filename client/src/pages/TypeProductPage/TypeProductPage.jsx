import React from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'

const TypeProductPage = () => {
 
  const onChange = () => {}
  return (
    <div style={{padding:'0 120px',backgroundColor:'#efefef'}} >
    <Row style={{padding:'0 120px',backgroundColor:'#efefef',flexWrap:'nowrap',paddingTop:'10px'}}>
      <Col span={4} style={{backgroundColor:'#fff',marginRight:'10px',padding:'10px',borderRadius:'6px',height:'fit-content'}}>
        <NavBarComponent />
      </Col>
      <Col span={20} style={{display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5px'  }}>
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
