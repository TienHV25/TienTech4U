import React, { useEffect, useState } from 'react'
import { InputWrapper, WarpperContainerLeft, WarpperContainerRight, WarpperTextLoginLeft, WarpperTextLoginRight, WarpperTextSmallLoginLeft, WarpperTextSmallLoginRight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imgRightLogin from "../../assets/images/login.png"
import { Image ,Input} from 'antd'
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

  const { data,isPending,isSuccess,isError } = mutation

  console.log('mutation:',mutation)

  useEffect(() => {
    if(isSuccess && data?.status !== 'ERR')
    {
       Message.success()
       handleNavigate()
    }
    else if(isError)
    {
       Message.error()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess,isError])

  const [isVisible,setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
  }

  if(!isVisible) return null

  const isDisabled = !email || !password || !confirmPassword

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
    console.log('sign-up:',email,password,confirmPassword)
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'rgba(0,0,0,0.53)'}}>
      <div style={{width:'800px',height:'445px',borderRadius:'6px',background:'#fff',display:'flex'}}>
        <WarpperContainerLeft>
           <Image onClick={handleNavigate} src={imgBackSignUp} alt='arrow' preview={false}  
            style={{width:'25x',height:'25px',cursor:'pointer'}} />
          <WarpperTextLoginLeft>Xin Chào</WarpperTextLoginLeft>
          <WarpperTextSmallLoginLeft>Nhập email và mật khẩu tài khoản</WarpperTextSmallLoginLeft>
          <InputWrapper>
            <InputForm placeholder='abc@email.com' value={email} onChange={handleOnChangeEmail} />
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePassword}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined  
              />)}
            />
            <Input.Password
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={handlePConfirmPassword}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </InputWrapper>

          {data?.status === 'ERR' && <span style={{color:'rgb(255, 66, 78)',marginTop:'20px',display:'flex',fontSize:'12px'}}>{data?.message}</span>} 
          <div style={{marginTop:'20px',display:'flex'}}>
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
                  width:'400px',
                  fontSize: '16px'
                }}
                textButton={'Đăng ký'}
              >               
              </ButtonComponent>
             </LoadingComponent>
            </div>
            <div style={{display:'flex',marginTop:'40px',textAlign:'center',fontSize:'14px',marginLeft:'100px'}}>
              <div style={{color:'rgb(120, 120, 120)'}}>
                 Bạn đã có tài khoản ?
              </div>
              <div onClick={handleNavigate}  style={{color:'rgb(13, 92, 182)',cursor:'pointer',marginLeft:'5px'}}>
                 Đăng nhập 
               </div>
            </div>
            
        </WarpperContainerLeft>
        <WarpperContainerRight>
          <Image src={imgCloseLogin } alt='Logo Login' preview={false} onClick={handleClose}
           style={{position:'absolute',width:'42px',height:'42px',cursor:'pointer',top:'-60px',right:'-170px'}} />  
          <Image src={imgRightLogin} alt='Logo Login' preview={false} />  
          <WarpperTextLoginRight>Mua sắm không lo</WarpperTextLoginRight>
          <WarpperTextSmallLoginRight>Siêu ưu đãi mỗi ngày</WarpperTextSmallLoginRight>
        </WarpperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage
