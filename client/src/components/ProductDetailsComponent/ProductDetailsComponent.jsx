import {  Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/detailproduct.webp'
import imageProductSmall from '../../assets/images/detailproductsmall.webp'
import imageProductSmall2 from '../../assets/images/detailproductsmall2.webp'
import { WrapperAddresTittleProduct, WrapperAdressProduct, WrapperButton, WrapperChangeAdress,  WrapperInforProduct, WrapperInforProductSmall, WrapperNumberOfProduct, WrapperNumButton, WrapperPriceProduct, WrapperPriceTextProduct, WrapperStyleColImage, WrapperStyledNameProduct, WrapperStyledTextProduct, WrapperStyleImageSmall } from './style'
import { useState } from 'react'
import checkLogo from '../../assets/images/checked.png'
import {StarFilled} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
    const images = [
        imageProductSmall,
        imageProductSmall2,
        imageProductSmall,
        imageProductSmall2,
        imageProductSmall,
        imageProductSmall2,
    ]
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const [quantity,setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(preQuantity => preQuantity + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(preQuantity => (preQuantity > 1 ? preQuantity - 1 : 1))
  }

  const handleClick = (index) => {
    setSelectedImageIndex(index)// Thay đổi trạng thái khi click
  }

  return (
    <Row>
        <Col span={10} style={{padding:'16px',backgroundColor:'#fff'}}>
           <Image src={imageProduct} alt='Image Product Details' preview={false}
            style={{border:'1px solid rgba(0, 0, 0, 0.1)',borderRadius:'5px'}} />
        
            <Row style={{paddingTop:'10px',justifyContent:'space-between',backgroundColor:'#fff'}}>
               {images.map((src,index) =>(
                <WrapperStyleColImage key={index} span={4}>
                    <WrapperStyleImageSmall
                    src={src}
                    alt="Image Product Details Small"
                    preview={false}
                    check={selectedImageIndex === index} // Kiểm tra index
                    onClick={() => handleClick(index)} // Xử lý click
                    style={{width:'80px'}}
                    />
                </WrapperStyleColImage>
               )
               )
               }
            <div style={{padding:'10px'}}>
                <WrapperInforProduct>
                    Đặc điểm nổi bật
                </WrapperInforProduct>
                <div style={{marginTop:'10px'}}>
                 <Image src={checkLogo} alt='check logo' preview={false} style={{height:'16px'}}/>
                  <WrapperInforProductSmall style={{marginLeft:'5px'}}>Cung cấp công thức chiến thắng trong các trò chơi đấu trí hàng ngày.</WrapperInforProductSmall>
                </div> 
                <div style={{marginTop:'10px'}}>
                 <Image src={checkLogo} alt='check logo' preview={false} style={{height:'16px'}}/>
                  <WrapperInforProductSmall style={{marginLeft:'5px'}}>Phân tích và giải thích các khái niệm lý thuyết trò chơi dễ hiểu.</WrapperInforProductSmall>
                </div>    
                <div style={{marginTop:'10px'}}>
                 <Image src={checkLogo} alt='check logo' preview={false} style={{height:'16px'}}/>
                  <WrapperInforProductSmall style={{marginLeft:'5px'}}>Hướng dẫn đọc hiểu hành vi tâm lý của người khác và chiếm ưu thế trong trò chơi.</WrapperInforProductSmall>
                </div>                
            </div>  
            </Row>
        </Col>
        <Col span={14} style={{padding:'16px',backgroundColor:'#fff'}} >
             <WrapperStyledNameProduct>Lý Thuyết Trò Chơi</WrapperStyledNameProduct>
             <div>
                <WrapperStyledTextProduct>3</WrapperStyledTextProduct>
                <StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)',marginLeft:'5px'}}/>
                <StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)',marginLeft:'5px'}}/>
                <StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)',marginLeft:'5px'}}/>
                <WrapperStyledTextProduct>(422)</WrapperStyledTextProduct>
                <WrapperStyledTextProduct>| Đã bán 1000+</WrapperStyledTextProduct>
              </div>
              < WrapperPriceProduct>
                 < WrapperPriceTextProduct>
                     135.000 
                     <span style={{fontSize:'80%',lineHeight:'0.6',position:'relative',verticalAlign:'baseline'}}>
                     ₫
                     </span>
                 </WrapperPriceTextProduct>
              </WrapperPriceProduct>
              <div>
                <WrapperAddresTittleProduct>Thông tin vận chuyển</WrapperAddresTittleProduct>
              </div>
              <div>
                <Row>
                  <Col span={20}>
                    <WrapperAdressProduct> Giao đến Q. 1, P. Bến Nghé, Hồ Chí Minh</WrapperAdressProduct>
                  </Col>
                  <Col span={4}> 
                      <WrapperChangeAdress>Đổi</WrapperChangeAdress>
                  </Col>
                </Row>
              </div> 
              <WrapperNumberOfProduct>Số Lượng</WrapperNumberOfProduct>  
              <div>
                  <WrapperButton onClick={decreaseQuantity}>
                    -
                  </WrapperButton>
                  <WrapperNumButton>{quantity}</WrapperNumButton>
                  <WrapperButton onClick={increaseQuantity} >
                    +
                  </WrapperButton>
              </div>
              <div style={{marginTop:'20px',display:'flex'}}>
                 <ButtonComponent 
                    size={40}
                    styleButton={{
                      background: 'rgb(255, 66, 78)',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      color: 'rgb(255, 255, 255)',
                      height: '40px',
                      width:'300px',
                      fontSize: '16px'
                    }}
                    textButton={'Chọn Mua'}
                 >               
                 </ButtonComponent>

                 <ButtonComponent 
                    size={40}
                    styleButton={{
                      background: 'rgb(255, 255, 255)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      color: 'rgb(10, 104, 255)',
                      height: '40px',
                      width:'300px',
                      fontSize: '16px',
                      border:'1px solid',
                      marginLeft:'20px'
                    }}
                    textButton={'Mua Trước Trả Sau'}
                 >               
                 </ButtonComponent>

              </div>
        </Col>
    </Row>
  )
}

export default ProductDetailsComponent
