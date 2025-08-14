import React, { useEffect, useState } from 'react'
import { 
  WrapperContentProfile, 
  WrapperHeader, 
  WrapperLabel, 
  WrapperInput, 
  WrapperButton, 
  WrapperUploadFile,
  WrapperContainer,
  WrapperInputBox,
  AvatarImage,
  MessageSuccess,
  MessageError
} from '../UserProfile/style'
import InputForm from '../../components/InputForm/InputForm'
import { useSelector, useDispatch } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as UserService from '../../services/UserService'
import { updateUser } from '../../redux/slides/userSlide'
import { jwtDecode } from "jwt-decode"
import { getBase64, isJsonString } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useMutationHook } from '../../hooks/useMutationHook'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const UserProfile = () => { 
  const user = useSelector((state) => state.user)
  const [email,setEmail] = useState(user?.email)
  const [name,setName] = useState(user?.name)
  const [phone,setPhone] = useState(user?.phone)
  const [address,setAddress] = useState(user?.address)
  const [avatar,setAvatar] = useState(user?.avatar)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if(!accessToken) {
      navigate("/")
    } 
  },[navigate])

  useEffect(() => {
    setEmail(user?.email) 
    setName(user?.name) 
    setPhone(user?.phone) 
    setAddress(user?.address) 
    setAvatar(user?.avatar) 
  },[user])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token') 
    let decoded = {}
    if(storageData && isJsonString(storageData) ) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { storageData,decoded }
  }
   
  const {decoded} = handleDecoded()

  const mutation = useMutationHook(
    (data) => UserService.updateUser(decoded?.id,data)
  )

  const { data } = mutation

  const handleOnChangeEmail = (e) => setEmail(e.target.value)
  const handleOnChangeName = (e) => setName(e.target.value)
  const handleOnChangePhone = (e) => setPhone(e.target.value)
  const handleOnChangeAddress = (e) => setAddress(e.target.value)
  
  const handleOnChangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }

  const handleUpdate = async  () => {
    const {storageData,decoded} = handleDecoded()
    const userData = { email, name, phone, address, avatar }
    mutation.mutate(userData)
    if(decoded?.id) {
      const res = await UserService.updateUser(decoded?.id,storageData,userData)
      if (res?.status === 'OK') {
        dispatch(updateUser({...res?.data,access_token:storageData}))
        setMessage('Cập nhật thông tin thành công!')
      } 
    }
  }

  setTimeout(() => {
    setMessage(null);
  }, 5000)
 
  return (
    <WrapperContainer>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContentProfile>
        
        <WrapperInput>
          <WrapperLabel htmlFor="name">Họ Tên</WrapperLabel>
          <WrapperInputBox>
            <InputForm placeholder='Nguyễn Văn A' id="name" value={name} onChange={handleOnChangeName} />
          </WrapperInputBox>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <WrapperInputBox>
            <InputForm placeholder='abc@email.com' id="email" value={email} onChange={handleOnChangeEmail} />
          </WrapperInputBox>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="phone">SĐT</WrapperLabel>
          <WrapperInputBox>
            <InputForm placeholder='0903xxxx' id="phone" value={phone} onChange={handleOnChangePhone} />
          </WrapperInputBox>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="address">Địa Chỉ</WrapperLabel>
          <WrapperInputBox>
            <InputForm placeholder='Q.1 Bến Nghé TP.HCM' id="address" value={address} onChange={handleOnChangeAddress} />
          </WrapperInputBox>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
          <WrapperInputBox>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && <AvatarImage src={avatar} alt='avatar' />}
          </WrapperInputBox>
        </WrapperInput>

        <WrapperButton>
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              borderRadius: '4px',
              border: '1px solid rgb(26,148,255)',
              fontWeight: '500',
              color:  'rgb(26,148,255)',
              height: '30px',
              width:'150px',
              fontSize: '14px',
              padding: '6px'
            }}
            textButton={'Cập Nhật'}             
          />               
        </WrapperButton>

        {message && <MessageSuccess>{message}</MessageSuccess>}
        {data?.status === 'ERR' && <MessageError>{data?.message}</MessageError>} 

      </WrapperContentProfile>
    </WrapperContainer>
  )
}

export default UserProfile
