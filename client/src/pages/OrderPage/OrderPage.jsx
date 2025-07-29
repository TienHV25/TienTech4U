import React, { useState , useEffect, useMemo } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import {updateOrderAmount,removeOrderProduct,removeOrderProductAll} from '../../redux/slides/orderSlide'
import {getDetailProduct} from '../../services/ProductService'
import { toast, Toaster } from 'react-hot-toast'
import { Button,  Form,  Input,  message,  Modal } from "antd"
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { isJsonString } from '../../utils'
import {updateUser} from '../../redux/slides/userSlide'
import {
  Container,
  Header,
  MainContent,
  ProductSection,
  ProductRow,
  ProductImage,
  ProductInfo,
  ProductName,
  QuantityControls,
  QuantityButton,
  QuantityInput,
  ProductTotal,
  DeleteIcon,
  SummarySection,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalSection,
  TotalLabel,
  TotalAmount,
  TaxNote,
  CheckoutButtonSuccess,
  CheckoutButtonFail,
  ColumnHeader
} from './style';

const OrderPage = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const order = useSelector((state) => state.order)
  const [form] = Form.useForm()
  const user = useSelector((state) => state.user)
  const [countProduct,setCountProduct] = useState(0)
  const dispatch = useDispatch()
  const [discountTotal, setDiscountTotal] = useState(0)

  useEffect(() => {
    if (order && order.orderItems) {
      setCountProduct(order.orderItems.length)
    }
  }, [order])

  useEffect(() => {
    if (order && order.orderItems) {
      setSelectedItems(order.orderItems.map(item => item.product))
    }
  }, [])

  
 useEffect(() => {
    const fetchDiscounts = async () => {
      let totalDiscount = 0;

      const filteredItems = order.orderItems.filter(item => selectedItems.includes(item.product));

      for (const item of filteredItems) {
        const productDetail = await getDetailProduct(item.product);
        if (productDetail && productDetail.data) {
          const discountAmount = (item.price * productDetail.data.discount) / 100 || 0;
          totalDiscount += discountAmount * item.amount;
        }
      }

      setDiscountTotal(totalDiscount);
    };

    fetchDiscounts();
 }, [selectedItems, order]);

  const handleQuantityChange = (productId, value) => {
    if (value >= 1) {
      dispatch(updateOrderAmount({ productId, amount: value }))
    }
  }

  const decreaseQuantity = (productId, currentAmount) => {
    if (currentAmount > 1) {
        dispatch(updateOrderAmount({ productId, amount: currentAmount - 1 }))
      }
    }

  const increaseQuantity = (productId, currentAmount) => {
    dispatch(updateOrderAmount({ productId, amount: currentAmount + 1 }))
  }

  const handleDeleteProductOrder = (productId) => {
    dispatch(removeOrderProduct({productId}))
    setSelectedItems(selectedItems.filter(id => id !== productId))
  }

  const handleDeleteProductOrderAll = (selectedItems) => {
    dispatch(removeOrderProductAll({selectedItems}))
    setSelectedItems([])
  }

  const handleSelectAll = () => {
    if (selectedItems.length === order.orderItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(order.orderItems.map(item => item.product))
    }
  }

  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId))
    } else {
      setSelectedItems([...selectedItems, productId])
    }
  }

  const handleAddCard = () => {
    if(!user?.phone || !user?.address || !user?.name )
      {
        toast.error('Thiếu thông tin người dùng,vui lòng cập nhật lại !')
        form.setFieldsValue({
          email: user?.email || '',
          name: user?.name || '',
          phone: user?.phone || '',
          address: user?.address || '',
        });
        setIsModalOpen(true)
      }
    else{
        console.log('user',user)
    }
  }

  const handleCancel = () => {
      setIsModalOpen(false)
      form.resetFields()
    }
  
  const updateMutation = useMutationHook( 
    ({ id, token,data }) => UserService.updateUser(id, token,data ),
    {
      onSuccess: (response) => {
        message.success('Cập nhật người dùng thành công!')
        setIsModalOpen(false)

        if (response?.data) {
          dispatch(updateUser(response.data))
        }
        },
      onError: () => {
        message.error('Cập nhật thất bại!')
      }
    }
  )
  
  const onFinish = (values) => {
    let storageData= localStorage.getItem('access_token')
    if(storageData && isJsonString(storageData) ) {
    storageData = JSON.parse(storageData)
    updateMutation.mutate({ id: user?.id, token: storageData, data: values})
  }}
  
  const totalPrice = order?.orderItems
  ?.filter(item => selectedItems.includes(item.product))
  ?.reduce((sum, item) => sum + item.amount * item.price, 0)

  const tax = useMemo(() => {
    if (totalPrice === 0) return 0;
    return totalPrice > 1000000 ? 10000 : 20000;
  }, [totalPrice])

  return (
    <Container>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
           style: {
            fontSize: '16px',
            padding: '12px 16px',
          },
          }}/>
      <Header>Giỏ hàng</Header>
      
      <MainContent>
        <ProductSection>
          <div style={{ display:'flex',background:'white',borderRadius:'8px',marginBottom:'20px',
            padding:'10px',alignItems: 'center', fontSize: '14px', color: '#666'  }}>
            <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={selectedItems.length === order.orderItems.length}
                onChange={handleSelectAll}
                style={{ width: '16px', height: '16px', marginRight: '8px' }}
              />
              Tất cả ({countProduct} sản phẩm)
            </div>
            <div style={{ flex: 1, marginRight: '15px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Đơn giá
              </ColumnHeader>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Số lượng
              </ColumnHeader>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Thành tiền
              </ColumnHeader>
              <div style={{ width: '30px' }}><DeleteIcon onClick={() => handleDeleteProductOrderAll(selectedItems)}><i className="fas fa-trash"></i></DeleteIcon></div>
            </div>
          </div>
          {order && order?.orderItems.map((item, index) => (
            <ProductRow key={index}>
               <input 
                type="checkbox" 
                checked={selectedItems.includes(item?.product)} 
                onChange={() => handleSelectItem(item?.product)}
                style={{ width: '16px', height: '16px', marginRight: '8px' }}
              />
              <ProductImage>
                <img 
                  src={item?.image || "/api/placeholder/80/80"} 
                  alt="Product" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{item?.name}</ProductName>
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                  <div style={{ minWidth: '100px', textAlign: 'center', fontSize: '14px', color: '#333' }}>
                    {item?.price?.toLocaleString('vi-VN')} đ
                  </div>
                  
                  <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
                    <QuantityControls>
                      <QuantityButton onClick={() => decreaseQuantity(item?.product, item?.amount)}>-</QuantityButton>
                      <QuantityInput 
                        type="number" 
                        value={item?.amount}
                        onChange={(e) => handleQuantityChange(item?.product, parseInt(e.target.value) || 1)}
                      />
                      <QuantityButton onClick={() => increaseQuantity(item?.product, item?.amount)}>+</QuantityButton>
                    </QuantityControls>
                  </div>

                  <ProductTotal style={{ minWidth: '100px', textAlign: 'center' }}>
                     {(item?.amount * item?.price)?.toLocaleString('vi-VN')} đ
                  </ProductTotal>

                  <DeleteIcon onClick={() => handleDeleteProductOrder(item?.product)}><i className="fas fa-trash"></i></DeleteIcon>
                </div>
              </ProductInfo>
            </ProductRow>
          ))}
        </ProductSection>


        <SummarySection>
          <SummaryRow>
            <SummaryLabel>Tạm tính</SummaryLabel>
            <SummaryValue>{totalPrice.toLocaleString('vi-VN')} đ</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Giảm giá</SummaryLabel>
            <SummaryValue>-{discountTotal.toLocaleString('vi-VN')} đ</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Phí giao hàng</SummaryLabel>
            <SummaryValue>{tax.toLocaleString('vi-VN')} đ</SummaryValue>
          </SummaryRow>
          
          <TotalSection>
            <TotalLabel>Tổng tiền</TotalLabel>
            <TotalAmount>{(totalPrice - discountTotal + tax).toLocaleString('vi-VN')} đ</TotalAmount>
            <TaxNote>(đã bao gồm VAT nếu có)</TaxNote>
            {selectedItems.length > 0 ? 
            <CheckoutButtonSuccess onClick={() => handleAddCard()}>Mua hàng</CheckoutButtonSuccess>
            :
            <CheckoutButtonFail onClick={() => handleAddCard()}>Mua hàng</CheckoutButtonFail>
            }
          </TotalSection>
        </SummarySection>
        <Modal title="Cập nhật thông tin người dùng"  open={isModalOpen} onCancel={handleCancel}  okButtonProps={{ style: { display: 'none' } }}>
                 <Form
                    name="basic"
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 20,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    form={form}
                    autoComplete="off"
                  >   
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập email!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Họ Tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập họ tên!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
          
                      <Form.Item
                        label="SĐT"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập SĐT!',
                          },
                        ]}
                      >
                        <Input  />
                      </Form.Item>
          
                      <Form.Item
                        label="Địa Chỉ"
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập Địa Chỉ!',
                          },
                        ]}
                      >
                        <Input  />
                      </Form.Item>

                      <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
        </Modal>
      </MainContent>
    </Container>
  );
};

export default OrderPage;