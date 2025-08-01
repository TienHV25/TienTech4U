import React, { useEffect, useState } from 'react'
import {Badge, Col,Input, Popover} from 'antd'
import { WrapperHeader, WrapperTextHeader,WrapperAccountHeader, WrapperTextHeaderSmall,
   WrapperContentPopUp, WrapperTextHeaderSmallLogin, WrapperIconText} from './style'
import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined,HomeOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import {useDispatch} from "react-redux"
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import {searchProduct} from "../../redux/slides/productSlide"



const { Search } = Input;

const HeaderComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [loading,setLoading ] = useState(false)
  const [userAvatar,setUserAvatar] = useState('')
  const [search,setSearch] = useState('')
  const resetSearchProduct = useSelector((state) => state.product.search)
  const order = useSelector((state) => state.order)
  const handleNavigateLogin = () => {
      navigate('/sign-in')
  }

  const handleNavigateUserProfile = () => {
      navigate('/user-profile')
  }

  const handleNavigateSystemAdmin = () => {
      navigate('/system/admin')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setUserAvatar(user?.avatar)
  },[user?.avatar])

  useEffect(() => {
  if (resetSearchProduct === '') {
    setSearch('');
  }
  }, [resetSearchProduct])

  const content = ( 
    <div>
      <WrapperContentPopUp onClick={handleLogout}>Đăng Xuất</WrapperContentPopUp>
      <WrapperContentPopUp onClick={handleNavigateUserProfile}>Thông tin người dùng</WrapperContentPopUp>
      {user?.isAdmin && (
      <WrapperContentPopUp onClick={handleNavigateSystemAdmin}>Quản lý hệ thống</WrapperContentPopUp>
      )
      }
    </div>
  )
  const handleNavigateHome = () => {
    navigate('/')
  }
  const onSearch = (e) =>{
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
     <WrapperHeader>
       <Col span={4}>
         <WrapperTextHeader onClick={handleNavigateHome}>
           <span style={{cursor: 'pointer'}}>Tiến Tech4U</span>
         </WrapperTextHeader>
       </Col>
       <Col span={12} >
         <Search
          placeholder="Nhập thông tin cần tìm"
          allowClear
          value={search}
          size="large"
          onChange={onSearch}
         />
       </Col>
       <Col span={8} style={{display:'flex',gap:'20px'}}>
        <WrapperAccountHeader>
         <WrapperIconText>
           <HomeOutlined style={{fontSize:'23px'}} />
           <WrapperTextHeaderSmall style={{cursor:'pointer'}} onClick={handleNavigateHome}>Trang Chủ</WrapperTextHeaderSmall>
         </WrapperIconText>
         <WrapperIconText>
          {userAvatar ? (
            <img src={userAvatar} style={{
              height:'32px',
              width:'32px',
              borderRadius:'50%',
              objectFit:'cover'
           }}
             alt='avatar'/> 
          ) : 
          (
            <UserOutlined style={{fontSize:'20px',marginLeft:'15px'}} /> 
          )}
          <LoadingComponent isPending={loading}>
            {user?.name ? (
              <>
                <div style={{cursor:'pointer'}}>
                <Popover content={content} trigger="click" overlayStyle={{ width: '170px', height: '10px' }}>
                  <WrapperTextHeaderSmallLogin>
                      Xin Chào {user?.name}
                  </WrapperTextHeaderSmallLogin>
                </Popover>
                </div>
              </>
            ) : (      
              <div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
                  <WrapperTextHeaderSmallLogin>
                    Đăng Nhập/Đăng Ký
                  </WrapperTextHeaderSmallLogin>
                <div>
                  <WrapperTextHeaderSmallLogin>
                    Tài Khoản
                    <CaretDownOutlined />
                  </WrapperTextHeaderSmallLogin>
                </div>           
              </div>
            )
            }
          </LoadingComponent>
         </WrapperIconText>
         {user?.id ?
         <WrapperIconText onClick={() => navigate('/order')} style={{cursor:'pointer'}}>
            <Badge count={order?.orderItems?.length} size='small'>
               <ShoppingCartOutlined style={{fontSize:'23px',color:'#fff',marginLeft:'20px'}} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
         </WrapperIconText>
         : 
         <WrapperIconText onClick={() =>  navigate('/sign-in')} style={{cursor:'pointer'}}>
            <Badge count={order?.orderItems?.length} size='small'>
               <ShoppingCartOutlined style={{fontSize:'23px',color:'#fff',marginLeft:'20px'}} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
         </WrapperIconText>
         }
         </WrapperAccountHeader>
       </Col>
     </WrapperHeader>
  )
}

export default HeaderComponent
