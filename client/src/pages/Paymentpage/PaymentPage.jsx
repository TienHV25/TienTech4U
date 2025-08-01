import React, { useState , useEffect, useMemo } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import {getDetailProduct} from '../../services/ProductService'
import { toast, Toaster } from 'react-hot-toast'
import { Button,  Form,  Input,  message,  Modal } from "antd"
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { isJsonString } from '../../utils'
import {updateUser} from '../../redux/slides/userSlide'
import {orderConstant} from '../../constant'
import {
  Container,
  Header,
  MainContent, 
  ProductSection,
  SummarySection,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalSection,
  TotalLabel,
  TotalAmount,
  TaxNote,
  CheckoutButtonSuccess,
  SectionBox,
  SectionTitle,
  OptionBox,
  Radio,
  OptionLabel,
  OptionText
} from './style';
import { useNavigate } from 'react-router-dom';
const PaymentPage = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const order = useSelector((state) => state.order)
  const [form] = Form.useForm()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [discountTotal, setDiscountTotal] = useState(0)
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems') || '[]');
  const [delivery,setDelivery] = useState(orderConstant.delivery.fast)
  const [payment,setPayment] = useState(orderConstant.payment.later_money)
  const navigate = useNavigate()
 
  useEffect(() => {
    const fetchDiscounts = async () => {
      let totalDiscount = 0;

      for (const item of selectedItems) {
        const productDetail = await getDetailProduct(item.product);
        if (productDetail?.data?.discount) {
          const discountAmount = (item.price * productDetail.data.discount) / 100;
          totalDiscount += discountAmount * item.amount;
        }
      }

      setDiscountTotal(totalDiscount)
    }

    fetchDiscounts()
  }, [selectedItems])

  const addOrderMutation  = useMutationHook( 
    ({  token,data }) => OrderService.createOrder( token,data ),
    {
      onSuccess: () => {
        message.success('Đặt hàng thành công!')
        navigate('/orderSuccess',{state :
          { delivery : delivery,
            payment: payment,
            selectedItems:selectedItems,
            totalPrice:finalPrice
          }})
      },
      onError: () => {
        message.error('Đặt hàng thất bại!')
      }
    }
  )

  const handleAddOrder = () => {
      addOrderMutation.mutate({
        token: user?.access_token,
        data: {
          orderItems: selectedItems,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          paymentMethod: payment,
          itemPrice: Number(totalPrice),
          shippingPrice: Number(shippingPrice),
          totalPrice: Number(finalPrice),
          user: user?.id
        }
      })
  }

  const handleCancel = () => {
      setIsModalOpen(false)
      form.resetFields()
    }
  
  const handleChangeAddress = () => {
    form.setFieldsValue({
          email: user?.email || '',
          name: user?.name || '',
          phone: user?.phone || '',
          address: user?.address || '',
        });
     setIsModalOpen(true)
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
  
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.amount * item.price, 0)

  const shippingPrice = useMemo(() => {
    if (totalPrice === 0) return 0;
    return totalPrice > 1000000 ? 10000 : 20000;
  }, [totalPrice])

  const finalPrice = (totalPrice - discountTotal + shippingPrice)

  return (
    <Container>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
           style: {
            fontSize: '16px',
            padding: '12px 16px',
          },
          }}/>
      <Header>Thanh Toán</Header>
      
      <MainContent>
        <ProductSection style={{ width: '100%' }}>
           <SectionBox>
            <SectionTitle>Chọn phương thức giao hàng</SectionTitle>

            <OptionBox type="fast">
              <Radio type="radio" name="shipping" checked={delivery === orderConstant.delivery.fast}
               onChange={() => setDelivery(orderConstant.delivery.fast)} />
              <OptionLabel type="fast">{orderConstant.delivery.fast}</OptionLabel>
              <OptionText>Giao hàng tiết kiệm</OptionText>
            </OptionBox>

            <OptionBox type="gojek" $last>
              <Radio type="radio" name="shipping" checked={delivery === orderConstant.delivery.gojeck}
               onChange={() => setDelivery(orderConstant.delivery.gojeck)} />
              <OptionLabel type="gojek">{orderConstant.delivery.gojeck}</OptionLabel>
              <OptionText>Giao hàng tiết kiệm</OptionText>
            </OptionBox>
          </SectionBox>

          <SectionBox>
            <SectionTitle>Chọn phương thức thanh toán</SectionTitle>
            <OptionBox>
              <Radio type="radio" name="payment" 
              checked={payment === orderConstant.payment.later_money}
              onChange={() => setPayment(orderConstant.payment.later_money)} />
              <OptionText>{orderConstant.payment.later_money}</OptionText>
            </OptionBox>
          </SectionBox>
        </ProductSection>


        <SummarySection>
           <SummaryRow style={{display:'flex',flexDirection:'column'}}> 
            <div>
              <span style={{fontSize:'14px'}}>Địa chỉ giao hàng:</span>
            </div>
            <div>
              <span style={{fontSize:'14px',marginLeft:'5px',fontWeight:'bold'}}>{user?.address}</span>
           </div>
            <div>
              <span onClick={() => handleChangeAddress()} style={{fontSize:'14px',marginLeft:'10px',color:'blue',cursor:'pointer'}}>Thay đổi</span>
            </div>
           </SummaryRow>
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
            <SummaryValue>{shippingPrice.toLocaleString('vi-VN')} đ</SummaryValue>
          </SummaryRow>
          
          <TotalSection>
            <TotalLabel>Tổng tiền</TotalLabel>
            <TotalAmount>{finalPrice.toLocaleString('vi-VN')} đ</TotalAmount>
            <TaxNote>(đã bao gồm VAT nếu có)</TaxNote>
            <CheckoutButtonSuccess onClick={() => handleAddOrder()}>Đặt hàng</CheckoutButtonSuccess>
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

export default PaymentPage;