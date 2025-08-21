import React, { useEffect, useState } from 'react'
import { 
  InputWrapper, 
  WarpperContainerLeft, 
  WarpperContainerRight, 
  WarpperTextLoginLeft, 
  WarpperTextLoginRight, 
  WarpperTextSmallLoginLeft, 
  WarpperTextSmallLoginRight,
  WarpperImage,
  MainContainer,
  FormContainer,
  ErrorMessage,
  ButtonContainer,
  ForgotPasswordLink,
  SignUpPromptContainer,
  SignUpPromptText,
  SignUpLink,
  CloseButton
} from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imgRightLogin from "../../assets/images/login.png"
import { Image, Input } from 'antd'
import imgCloseLogin from "../../assets/images/closelogo.png"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()

  const handleOnChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/sign-up')
  }

  const mutation = useMutationHook(
    (data) => UserService.loginUser(data),
  )

  const { data, isPending, isSuccess } = mutation

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetUserDetail(decoded?.id, data?.access_token)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data])

  const handleGetUserDetail = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getUserDetail(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
  }

  if (!isVisible) return null

  const isDisabled = !email || !password

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

  return (
    <MainContainer>
      <FormContainer>
        <WarpperContainerLeft>
          <WarpperTextLoginLeft>Xin Chào</WarpperTextLoginLeft>
          <WarpperTextSmallLoginLeft>Đăng nhập email và mật khẩu tài khoản</WarpperTextSmallLoginLeft>
          <InputWrapper>
            <InputForm placeholder='abc@email.com' value={email} onChange={handleOnChangeEmail} />
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePassword}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </InputWrapper>

          {data?.status === 'ERR' && (
            <ErrorMessage>{data?.message}</ErrorMessage>
          )}

          <ButtonContainer>
            <LoadingComponent isPending={isPending}>
              <ButtonComponent
                onClick={handleSignIn}
                disabled={isDisabled}
                size={40}
                styleButton={{
                  background: isDisabled ? 'gray' : 'rgb(255, 66, 78)',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  color: 'rgb(255, 255, 255)',
                  height: '40px',
                  width: '400px',
                  fontSize: '16px'
                }}
                textButton={'Đăng Nhập'}
              />
            </LoadingComponent>
          </ButtonContainer>

          <ForgotPasswordLink>
            Quên mật khẩu ?
          </ForgotPasswordLink>

          <SignUpPromptContainer>
            <SignUpPromptText>
              Chưa có tài khoản ?
            </SignUpPromptText>
            <SignUpLink onClick={handleNavigate}>
              Tạo tài khoản
            </SignUpLink>
          </SignUpPromptContainer>
        </WarpperContainerLeft>

        <WarpperContainerRight>
          <CloseButton>
            <Image 
              src={imgCloseLogin} 
              alt='Logo Login' 
              preview={false} 
              onClick={handleClose}
            />
          </CloseButton>
          <WarpperImage
            src={imgRightLogin} 
            alt='Logo Login' 
            preview={false} 
          />
          <WarpperTextLoginRight>Mua sắm không lo</WarpperTextLoginRight>
          <WarpperTextSmallLoginRight>Siêu ưu đãi mỗi ngày</WarpperTextSmallLoginRight>
        </WarpperContainerRight>
      </FormContainer>
    </MainContainer>
  )
}

export default SignInPage