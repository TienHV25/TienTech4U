import React, { useEffect,useState } from 'react'
import { InputWrapper, WarpperContainerLeft, WarpperContainerRight, WarpperTextLoginLeft, WarpperTextLoginRight, WarpperTextSmallLoginLeft, WarpperTextSmallLoginRight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imgRightLogin from "../../assets/images/login.png"
import { Image, Input } from 'antd'
import imgCloseLogin from "../../assets/images/closelogo.png"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate,useLocation } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { jwtDecode } from "jwt-decode"
import {useDispatch} from "react-redux"
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

const { data,isPending,isSuccess} = mutation

useEffect(() => {
  if(isSuccess && data?.status !== 'ERR')
  {   
      if(location?.state){
        navigate(location?.state)
      }else{
        navigate('/')
      }
      localStorage.setItem('access_token',  JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token',  JSON.stringify(data?.refresh_token))
      if(data?.access_token) {
      const decoded = jwtDecode(data?.access_token)
      if(decoded?.id)
      {
        handleGetUserDetail(decoded?.id,data?.access_token)
      }
      }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[isSuccess,data])

const handleGetUserDetail = async (id,token) => {
  const storage = localStorage.getItem('refresh_token')
  const refreshToken = JSON.parse(storage)
  const res = await UserService.getUserDetail(id,token)
  dispatch(updateUser({...res?.data,access_token:token,refreshToken}))
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
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'rgba(0,0,0,0.53)'}}>
      <div style={{width:'800px',height:'445px',borderRadius:'6px',background:'#fff',display:'flex'}}>
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
          
           {data?.status === 'ERR' && <span style={{color:'rgb(255, 66, 78)',marginTop:'20px',display:'flex',fontSize:'12px'}}>{data?.message}</span>} 
            <div style={{marginTop:'20px',display:'flex'}}>   
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
                    width:'400px',
                    fontSize: '16px'
                  }}
                  textButton={'Đăng Nhập'}
                  >               
                  </ButtonComponent>
              </LoadingComponent>
              </div>
            <div style={{marginTop:'10px',textAlign:'center',color:'rgb(13, 92, 182)',cursor:'pointer',fontSize:'14px'}}>
              Quên mật khẩu ?
            </div>
            <div style={{display:'flex',marginTop:'90px',textAlign:'center',fontSize:'14px',marginLeft:'100px'}}>
              <div style={{color:'rgb(120, 120, 120)'}}>
                 Chưa có tài khoản ?
              </div>
              <div onClick={handleNavigate} style={{color:'rgb(13, 92, 182)',cursor:'pointer',marginLeft:'5px'}}>
                 Tạo tài khoản 
              </div>
            </div>
            
        </WarpperContainerLeft>
        <WarpperContainerRight>
          <Image src={imgCloseLogin } alt='Logo Login' preview={false}  onClick={handleClose}
           style={{position:'absolute',width:'42px',height:'42px',cursor:'pointer',top:'-60px',right:'-170px'}} />  
          <Image src={imgRightLogin} alt='Logo Login' preview={false} />  
          <WarpperTextLoginRight>Mua sắm không lo</WarpperTextLoginRight>
          <WarpperTextSmallLoginRight>Siêu ưu đãi mỗi ngày</WarpperTextSmallLoginRight>
        </WarpperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage
