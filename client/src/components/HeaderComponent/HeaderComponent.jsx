import React, { useEffect, useState } from 'react'
import { Badge, Col, Input, Popover } from 'antd'
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperAccountHeader,
  WrapperTextHeaderSmall,
  WrapperContentPopUp,
  WrapperTextHeaderSmallLogin,
  WrapperIconText,
  WrapperLogoText,
  WrapperCol8,
  AvatarImage,
  HomeIcon,
  CartIcon,
  ChevronDownIcon
} from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useDispatch } from "react-redux"
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { searchProduct } from "../../redux/slides/productSlide"

const { Search } = Input;

const HeaderComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
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

  const handleNavigateUserOrder = () => {
    navigate('/user-order')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setUserAvatar(user?.avatar)
  }, [user?.avatar])

  useEffect(() => {
    if (resetSearchProduct === '') {
      setSearch('');
    }
  }, [resetSearchProduct])

  const content = (
    <div>
      <WrapperContentPopUp onClick={handleLogout}>Đăng Xuất</WrapperContentPopUp>
      <WrapperContentPopUp onClick={handleNavigateUserProfile}>Thông tin người dùng</WrapperContentPopUp>
      <WrapperContentPopUp onClick={handleNavigateUserOrder}>Đơn hàng của tôi</WrapperContentPopUp>
      {user?.isAdmin && (
        <WrapperContentPopUp onClick={handleNavigateSystemAdmin}>Quản lý hệ thống</WrapperContentPopUp>
      )}
    </div>
  )

  const handleNavigateHome = () => {
    navigate('/')
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <WrapperHeader>
      <Col span={4}>
        <WrapperTextHeader onClick={handleNavigateHome}>
          <WrapperLogoText>Tiến Tech4U</WrapperLogoText>
        </WrapperTextHeader>
      </Col>
      <Col span={12}>
        <Search
          placeholder="Nhập thông tin cần tìm"
          allowClear
          value={search}
          size="large"
          onChange={onSearch}
        />
      </Col>
      <WrapperCol8 span={8}>
        <WrapperAccountHeader>
          <WrapperIconText>
            <HomeIcon />
            <WrapperTextHeaderSmall onClick={handleNavigateHome}>Trang Chủ</WrapperTextHeaderSmall>
          </WrapperIconText>
          <WrapperIconText>
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt='avatar' />
            ) : (
              <UserOutlined style={{ fontSize: '20px', marginLeft: '15px' }} />
            )}
            <LoadingComponent isPending={loading}>
              {user?.name ? (
                <div>
                  <Popover content={content} trigger="click" overlayStyle={{ width: '170px', height: '10px' }}>
                    <WrapperTextHeaderSmallLogin>
                      <span>Xin Chào {user?.name}</span>
                      <ChevronDownIcon />
                    </WrapperTextHeaderSmallLogin>
                  </Popover>
                </div>
              ) : (
                <div onClick={handleNavigateLogin}>
                  <WrapperTextHeaderSmallLogin>
                    Đăng Nhập/Đăng Ký
                  </WrapperTextHeaderSmallLogin>
                  <WrapperTextHeaderSmallLogin>
                    Tài Khoản
                    <CaretDownOutlined />
                  </WrapperTextHeaderSmallLogin>
                </div>
              )}
            </LoadingComponent>
          </WrapperIconText>
          <WrapperIconText onClick={() => navigate(user?.id ? '/order' : '/sign-in')}>
            <Badge count={order?.orderItems?.length} size='small'>
              <CartIcon />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
          </WrapperIconText>
        </WrapperAccountHeader>
      </WrapperCol8>
    </WrapperHeader>
  )
}

export default HeaderComponent
