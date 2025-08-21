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
  BackArrow,
  ErrorMessage,
  ButtonContainer,
  LoginPromptContainer,
  LoginPromptText,
  LoginLink,
  CloseButton
} from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imgRightLogin from "../../assets/images/login.png"
import { Image, Input } from 'antd'
import imgCloseLogin from "../../assets/images/closelogo.png"
import imgBackSignUp from "../../assets/images/backtosignin.png"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as Message from '../../components/Message/Message'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const handlePConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
  }

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/sign-in')
  }

  const mutation = useMutationHook(
    (data) => UserService.signupUser(data)
  )

  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      Message.success()
      handleNavigate()
    }
    else if (isError) {
      Message.error()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError])

  const [isVisible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
  }

  if (!isVisible) return null

  const isDisabled = !email || !password || !confirmPassword

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
  }

  return (
    <MainContainer>
      <FormContainer>
        <WarpperContainerLeft>
          <BackArrow>
            <Image 
              onClick={handleNavigate} 
              src={imgBackSignUp} 
              alt='arrow' 
              preview={false} 
            />
          </BackArrow>
          <WarpperTextLoginLeft>Xin Chào</WarpperTextLoginLeft>
          <WarpperTextSmallLoginLeft>Nhập email và mật khẩu tài khoản</WarpperTextSmallLoginLeft>
          <InputWrapper>
            <InputForm placeholder='abc@email.com' value={email} onChange={handleOnChangeEmail} />
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePassword}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Input.Password
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={handlePConfirmPassword}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </InputWrapper>

          {data?.status === 'ERR' && (
            <ErrorMessage>{data?.message}</ErrorMessage>
          )}
          
          <ButtonContainer>
            <LoadingComponent isPending={isPending}>
              <ButtonComponent
                onClick={handleSignUp}
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
                textButton={'Đăng ký'}
              />
            </LoadingComponent>
          </ButtonContainer>
          
          <LoginPromptContainer>
            <LoginPromptText>
              Bạn đã có tài khoản ?
            </LoginPromptText>
            <LoginLink onClick={handleNavigate}>
              Đăng nhập
            </LoginLink>
          </LoginPromptContainer>
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

export default SignUpPage