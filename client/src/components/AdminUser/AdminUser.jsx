import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button,  Form,  Input,  message,  Modal, Space } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputForm from '../InputForm/InputForm'
import { useMutationHook } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import { getBase64, isJsonString } from '../../utils'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { WrapperUploadFile } from '../AdminProduct/style'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import * as UserService from '../../services/UserService'
import { jwtDecode } from 'jwt-decode'

const AdminUser = () => {
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [detailForm] = Form.useForm();
    const [rowSelected,setRowSelected] = useState('')
    const [isOpenDraw,setIsOpenDraw] = useState(false)
    const [isEditMode, setIsEditMode] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [isPendingDetail,setIsPendingDetail] = useState(false)
    const searchInput = useRef(null)
    const [stateUser,setStateUser] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    })
    const [stateUserDetail,setStateUserDetail] = useState({
      name: '',
      email: '',
      isAdmin: false,
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
      avatar: ''
   })
    
  
    const getAllUser = async() => {
        const res = await UserService.getAllUser()
        return res
    }

    const { isPending: isPendingUsers, data: users } = useQuery({
      queryKey: ['users'],
      queryFn: getAllUser,
    })

    const fetchGetDetailUser = async () => {
        let storageData= localStorage.getItem('access_token')
        if(storageData && isJsonString(storageData) ) {
        storageData = JSON.parse(storageData)
        const res = await UserService.getUserDetail(rowSelected, storageData)
        if (res?.data) {
          setStateUserDetail({
            name: res?.data?.name,
            email: res?.data?.email,
            isAdmin: res?.data?.isAdmin,
            phone: res?.data?.phone,
            address: res?.data?.address,
            password: res?.data?.password,
            confirmPassword:res?.data?.password,
            avatar: res?.data?.avatar,
          })}
        } 
    }
  
    useEffect(() => {
        detailForm.setFieldsValue(stateUserDetail)
      },[detailForm,stateUserDetail])
  
    const { refetch: refetchUsers } = useQuery({
      queryKey: ['users'],
      queryFn: getAllUser,
     })
    
     const mutation = useMutationHook(
      (data) => {
        const { email, password, confirmPassword,phone,address } = data;
        return UserService.signupUser({ email, password, confirmPassword,phone,address })
      },
      {
        onSuccess: () => {
          message.success('Tạo người dùng thành công!')
          refetchUsers()
        },
        onError: () => {
          message.error('Tạo thất bại!');
        }
      }
    )
    const {data,isPending,isSuccess,isError} = mutation

    const updateMutation = useMutationHook( 
      ({ id, token,data }) => UserService.updateUser(id, token,data ),
      {
        onSuccess: () => {
          message.success('Cập nhật người dùng thành công!')
          setIsOpenDraw(false)
          refetchUsers()
        },
        onError: () => {
          message.error('Cập nhật thất bại!');
        }
      }
    )
  
    const onUpdateUser = () => {
      let storageData= localStorage.getItem('access_token')
      if(storageData && isJsonString(storageData) ) {
      storageData = JSON.parse(storageData)
      updateMutation.mutate({ id: rowSelected, token: storageData, data: stateUserDetail})
    }}
  
    const mutationDelete = useMutationHook(
    ({ id, token }) => UserService.deleteUser(id,token),
    {
      onSuccess: () => {
        message.success('Xóa người dùng thành công!')
        setIsDeleteModalOpen(false)
        refetchUsers()
      },
      onError: () => {
        message.error('Xóa thất bại!');
      }
    })
  
    const handleDeleteUser = async () => {
    if (userToDelete) {
    const storageData = localStorage.getItem('access_token')
    if (storageData && isJsonString(storageData)) {
      const parsedStorageData = JSON.parse(storageData)
      console.log('storageData', parsedStorageData)
      mutationDelete.mutate({ id: userToDelete, token: parsedStorageData })
      setUserToDelete(null)
    }
    }
    }

    const mutationDeleteMany = useMutationHook((id) => UserService.deleteUserMany(id))

    const handleDeleteUserMany = async (id) => {
        if (id) {
          const res = await mutationDeleteMany.mutateAsync(id)
          if (res.status === 'OK') {
            message.success('Xóa người dùng thành công!')
            refetchUsers()
          } else {
            message.error('Xóa người dùng thất bại!')
          }
        }
      }
    

    const  handleDetailUser = () => {
      if(rowSelected)
      {
        fetchGetDetailUser()
      }
      setIsOpenDraw(true)
    }
  
    const showDeleteConfirm = (id) => {
      setUserToDelete(id)
      setIsDeleteModalOpen(true)
    }

    useEffect(() => {
      if (rowSelected) {
        if (isEditMode === 'true') {
          setIsPendingDetail(true)
          fetchGetDetailUser().finally(() => setIsPendingDetail(false))
          setIsOpenDraw(true)
        } else if (isEditMode === 'false') {
          showDeleteConfirm(rowSelected)
        }
      }
    }, [rowSelected, isEditMode])

    const renderAction = () => {
      return (
        <div>
           <DeleteOutlined style={{cursor:'pointer',fontSize:'20px',marginRight:'10px'}} onClick={() => {
            showDeleteConfirm(rowSelected)
            setIsEditMode('false')
            }}/>
           <EditOutlined style={{cursor:'pointer',fontSize:'20px'}} onClick={() => {
            handleDetailUser()
            setIsEditMode('true')
            }}/>
        </div>
      )
    }
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
    }
  
    const handleReset = (clearFilters) => {
      clearFilters();
    }
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        (record[dataIndex] ? record[dataIndex].toString() : "")
          .toLowerCase()
          .includes((value).toLowerCase()),
      filterDropdownProps: {
        onOpenChange(open) {
          if (open) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      },
    })

    const columns = [
      {
        title: 'Tên người dùng',
        dataIndex: 'name',
        sorter: (a, b) => (a?.name?.length || '') - (b?.name?.length || ''),
        ...getColumnSearchProps('name')
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a?.email?.length - b?.email?.length,
        ...getColumnSearchProps('email')  
      },
      {
        title: 'Admin',
        dataIndex: 'isAdmin',  
        filters: [
          {
            text: 'true',
            value: true,
          },
          {
            text: 'false',
            value: false,
          },
        ],
        onFilter: (value, record) => {
          if(value === true) {
            return record.isAdmin === true
          } else if(value === false) {
            return record.isAdmin === false
          }
        },       
        render: (isAdmin) => (isAdmin ? 'true' : 'false')
      },
      {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        ...getColumnSearchProps('phone')
      
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        ...getColumnSearchProps('phone')
      
      },
      {
        title: 'Xóa/Sửa',
        dataIndex: 'action',
        render: renderAction,
      },
      ]
  
    const dataTable = users?.data?.length && users?.data?.map((user) => {
      return {...user,key:user._id}
    })
  
    useEffect(() => {
      if(isSuccess && data?.status === 'OK') {
        message.success()
        handleCancel()
      } else if (isError) {
        message.error()
      }
    },[isSuccess]
    )
  
    const onChange = (e) => {
      setStateUser({
        ...stateUser,
        [e.target.name]:e.target.value
      })
    }
  
    const onChangeDetail = (e) => {
      setStateUserDetail({
        ...stateUserDetail,
        [e.target.name]:e.target.value
      })
    }
  
    const handleOnChangeAvatarDetail = async ({fileList}) => {
      if (fileList.length > 0) {
        const file = fileList[0]
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetail(prev => ({
          ...prev,
          avatar: file.preview,
          fileList 
        }))
      } else {
        setStateUserDetail({
          ...stateUserDetail,
          avatar: '',
          fileList: []
        })
      }
      }
    
    const handleCancel = () => {
      setIsModalOpen(false)
      setStateUser({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        avatar: ''
      })
      form.resetFields()
    }

    const handleOnCLose = () => {
      setStateUserDetail({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        avatar: '',
        fileList: [],
      })
      setIsOpenDraw(false)
    }
    

    const onFinish = () => {
      mutation.mutate(stateUser)
    }

    
  return (
    <div>
       <WrapperHeader>
          Quản lý người dùng
       </WrapperHeader>
       <Button style={{width:'150px',height:'150px',borderRadius:'6px',borderStyle:'dashed'}} onClick={() =>  setIsModalOpen(true)}>
          <PlusOutlined style={{fontSize:'40px'}} />
       </Button>
       <div style={{marginTop:'35px'}}>
      <TableComponent columns={columns} data={dataTable} isPending={isPendingUsers} handleDeleteUserMany={handleDeleteUserMany}  onRow={(record) => {
        return {
          onClick: () => {
            setRowSelected(record._id)
          }
        }
      }
        
      }  />
    </div>
    <Modal title="Tạo người dùng" forceRender open={isModalOpen} onCancel={handleCancel}  okButtonProps={{ style: { display: 'none' } }}>
      <LoadingComponent isPending={isPending}>
       <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
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
              <InputForm onChange={onChange} value={stateUser.email} name="email"/>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mật khẩu!',
                },
              ]}
            >
              <InputForm onChange={onChange} value={stateUser.password} type="password"  name="password"/>
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập lại mật khẩu!',
                },
              ]}
            >
              <InputForm onChange={onChange} value={stateUser.confirmPassword} type="password"  name="confirmPassword"/>
            </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
       </LoadingComponent>
      </Modal>
      <DrawerComponent title ='Chi tiết người dùng' isOpen = {isOpenDraw} onClose = {handleOnCLose} width='50%' forceRender>
        <LoadingComponent isPending={isPendingDetail}>
        <Form
            name="basics"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onUpdateUser}
            form={detailForm}
            autoComplete="off"
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên người dùng!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateUserDetail.name} name="name"/>
            </Form.Item>

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
              <InputForm onChange={onChangeDetail} value={stateUserDetail.email} name="email"/>
            </Form.Item>

            <Form.Item
              label="Admin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn quyền của Admin',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateUserDetail.isAdmin} name="isAdmin"/>
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập số điện thoại!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateUserDetail.phone} name="phone"/>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập địa chỉ!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateUserDetail.address} name="address"/>
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn avatar cho người dùng!',
                },
              ]}
            >    
              <WrapperUploadFile  onChange={handleOnChangeAvatarDetail} maxCount={1} fileList={stateUserDetail.fileList || []}>
                <div style={{display:'flex',flexDirection: 'column', alignItems: 'center' }}>
                    {stateUserDetail.avatar && (
                        <img src={stateUserDetail?.avatar} style={{
                            height:'60px',
                            width:'60px',
                            borderRadius:'50%',
                            objectFit:'cover',
                            marginBottom:'20px'
                        }}  alt='avatar'/>
                    )}        
                  <Button>Select File</Button>     
                </div>    
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>
      <Modal title="Xác nhận xóa" open={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>Không</Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteUser}>Có</Button>,
        ]}>
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
 </div>
  )
}

export default AdminUser
