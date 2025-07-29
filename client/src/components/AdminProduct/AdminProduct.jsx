import React, { useEffect, useRef, useState } from 'react'
import { Button,Form, Input, Modal, Select, Space } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperHeader, WrapperUploadFile } from './style'
import InputForm from '../InputForm/InputForm'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHook } from '../../hooks/useMutationHook'
import  LoadingComponent  from '../LoadingComponent/LoadingComponent'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'


const AdminProduct = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [detailForm] = Form.useForm();
  const [rowSelected,setRowSelected] = useState('')
  const [isOpenDraw,setIsOpenDraw] = useState(false)
  const [isEditMode, setIsEditMode] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [typeSelect,setTypeSelect] = useState('')
  const searchInput = useRef(null)
  
  const [stateProduct,setStateProduct] = useState({
     name: '',
     type: '',
     countInStock: '',
     price: '',
     description: '',
     rating: '',
     image: '',
     newType:'',
     discount:''
  })
  const [stateProductDetail,setStateProductDetail] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    discount:'',
 })


  const getAllProduct = async() => {
      const res = await ProductService.getAllProducts()
      return res
  }

  const fetchAllTypeProduct = async () => {
      const res = await ProductService.getAllType()
      return res
    }
  
  const typeProduct = useQuery({
    queryKey: ['type-product'],
    queryFn: fetchAllTypeProduct,
  })

  const { isPending: isPendingProducts, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProduct,
  })

  const fetchGetDetailProduct = async () => {
     const res = await ProductService.getDetailProduct(rowSelected)
     if(res?.data){
      setStateProductDetail({
        name: res?.data?.name,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        discount:res?.data?.discount,
      })
     } 
  }

  useEffect(() => {
    if(rowSelected) {
      fetchGetDetailProduct(rowSelected)
    }
    },[rowSelected])
  
  useEffect(() => {
      detailForm.setFieldsValue(stateProductDetail)
    },[detailForm,stateProductDetail])

  const handleDetailProduct = () => {
      if(rowSelected) {
        fetchGetDetailProduct()
      }
      setIsOpenDraw(true)
  }
  
  const { refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProduct,
   })

  const mutation = useMutationHook(
    (data) => {
      const {name,type,countInStock,price,description,rating,image,discount} = data
      return ProductService.createProducts({name,type,countInStock,price,description,rating,image,discount})
       },
      {
        onSuccess: () => {
          message.success('Tạo sản phẩm thành công!')
          refetchProducts()
        },
        onError: () => {
          message.error('Tạo thất bại!');
        }
      }
  )

  const {data,isPending,isSuccess,isError} = mutation

  const updateMutation = useMutationHook(
    ({ id, data }) => ProductService.updateProduct(id, data),
    {
      onSuccess: () => {
        message.success('Cập nhật sản phẩm thành công!')
        setIsOpenDraw(false)
        refetchProducts()
      },
      onError: () => {
        message.error('Cập nhật thất bại!');
      }
    }
  )

  const onUpdateProduct = () => {
    updateMutation.mutate({ id: rowSelected, data: stateProductDetail })
     console.log(stateProductDetail)
  }

  const mutationDelete = useMutationHook((id) => ProductService.deleteProduct(id))

  const mutationDeleteMany = useMutationHook((id) => ProductService.deleteProductMany(id))

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      const res = await mutationDelete.mutateAsync(productToDelete)
      if (res.status === 'OK') {
        message.success('Xóa sản phẩm thành công!')
        refetchProducts()
      } else {
        message.error('Xóa sản phẩm thất bại!')
      }
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    }
  }

  const handleDeleteProductMany = async (id) => {
    if (id) {
      const res = await mutationDeleteMany.mutateAsync(id)
      if (res.status === 'OK') {
        message.success('Xóa sản phẩm thành công!')
        refetchProducts()
      } else {
        message.error('Xóa sản phẩm thất bại!')
      }
    }
  }

  const showDeleteConfirm = (id) => {
    setProductToDelete(id)
    setIsDeleteModalOpen(true)
  }

  useEffect(() => {
  if(rowSelected && isEditMode === 'true') {
    handleDetailProduct()
  }
  },[rowSelected])

  useEffect(() => {
  if (rowSelected && isEditMode === 'false') {
    showDeleteConfirm(rowSelected)
  }
  }, [rowSelected])

  const renderAction = () => {
    return (
       <div>
                 <DeleteOutlined style={{cursor:'pointer',fontSize:'20px',marginRight:'10px'}} onClick={() => {
                  showDeleteConfirm(rowSelected)
                  setIsEditMode('false')
                  }}/>
                 <EditOutlined style={{cursor:'pointer',fontSize:'20px'}} onClick={() => {
                  handleDetailProduct()
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
      record[dataIndex]
        .toString()
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
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        ...getColumnSearchProps('name')
      
    },
    {
        title: 'Loại sản phẩm',
        dataIndex: 'type',
        sorter: (a, b) => a.type.length - b.type.length,
         
    },
    {
        title: 'Giá sản phẩm',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        filters: [
          {
            text: '>=50',
            value: '>=',
          },
          {
            text: '<=50',
            value: '<=',
          },
        ],
        onFilter: (value, record) => {
          if(value === '>=') {
            return record.price >= 50
          } else {
            return record.price <= 50
          }
        }   
    },
    {
        title: 'Đánh giá',
        dataIndex: 'rating',
        sorter: (a, b) => a.rating - b.rating,
        filters: [
          {
            text: '>=3',
            value: '>=',
          },
          {
            text: '<=3',
            value: '<=',
          },
        ],
        onFilter: (value, record) => {
          if(value === '>=') {
            return record.rating >= 3
          } else {
            return record.rating <= 3
          }
        }   
       
    },
    {
        title: 'Xóa/Sửa',
        dataIndex: 'action',
        render: renderAction,
    },
    ]

  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {...product,key:product._id}
  })

  useEffect(() => {
    if(isSuccess && data?.status === 'OK') {
      handleCancel()
    } else if (isError) {
      message.error()
    }
  },[isSuccess]
  )

  const onChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]:e.target.value
    })
  }

  const onChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]:e.target.value
    })
  }

  const handleOnChangeAvatar = async ({fileList}) => {
    if (fileList.length > 0) {
      const file = fileList[0]
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProduct({
        ...stateProduct,
        image: file.preview,
        fileList 
      })
    } else {
      setStateProduct({
        ...stateProduct,
        image: '',
        fileList: []
      })
    }
    }

  const handleOnChangeAvatarDetail = async ({fileList}) => {
    if (fileList.length > 0) {
      const file = fileList[0]
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProductDetail({
        ...stateProductDetail,
        image: file.preview,
        fileList 
      })
    } else {
      setStateProductDetail({
        ...stateProductDetail,
        image: '',
        fileList: []
      })
    }
    }
  
  const handleOnchangeType = (value) => {
      setStateProduct({
      ...stateProduct,
      type: value
    })
  }
  
  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      discount: ''
    })
    form.resetFields()
  }

  const handleOnCLose = () => {
    setStateProductDetail({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      discount: ''
    })
    setIsOpenDraw(false)
  }
  
  const onFinish = () => {
    const params = {
     name: stateProduct.name,
     type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
     countInStock: stateProduct.countInStock,
     price: stateProduct.price,
     description: stateProduct.description,
     rating: stateProduct.rating,
     image: stateProduct.image,
     discount: stateProduct.discount
    }
    mutation.mutate(params)
  }

  return (
    <div>
    <WrapperHeader>
       Quản lý sản phẩm
    </WrapperHeader>
    <Button style={{width:'150px',height:'150px',borderRadius:'6px #F7C948',borderStyle:'dashed'}} onClick={() => setIsModalOpen(true)}>
       <PlusOutlined style={{fontSize:'40px'}} />
    </Button>
    <div style={{marginTop:'35px'}}>
      <TableComponent columns={columns} data={dataTable} isPending={isPendingProducts}  handleDeleteProductMany={handleDeleteProductMany}  onRow={(record) => {
        return {
          onClick: () => {
            setRowSelected(record._id)
          }
        }
      }
        
      }  />
    </div>
    <Modal title="Tạo sản phẩm" forceRender open={isModalOpen} onCancel={handleCancel}  okButtonProps={{ style: { display: 'none' } }}>
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
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên sản phẩm!',
              },
            ]}
          >
            <InputForm onChange={onChange} value={stateProduct.name} name="name"/>
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[
              {
                required: true,
                message: 'Hãy nhập loại sản phẩm!',
              },
            ]}
          >
            <Select
              name="type"
              onChange={handleOnchangeType}
              value={stateProduct.type} 
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>

          {stateProduct.type === 'add_type' &&
           <Form.Item
            label="Loại sản phẩm mới"
            name="newType"
            rules={[
              {
                required: true,
                message: 'Hãy nhập loại sản phẩm!',
              },
            ]}
           >
             <InputForm onChange={onChange} value={stateProduct.newType} name="newType"/>
           </Form.Item>
          }

          <Form.Item
            label="Số lượng tồn kho"
            name="countInStock"
            rules={[
              {
                required: true,
                message: 'Hãy nhập số lượng tồn kho!',
              },
            ]}
          >
            <InputForm onChange={onChange} value={stateProduct.countInStock} name="countInStock"/>
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: 'Hãy nhập giá sản phẩm!',
              },
            ]}
          >
            <InputForm onChange={onChange} value={stateProduct.price} name="price"/>
          </Form.Item>

          <Form.Item
            label="Mô tả sản phẩm"
            name="description"
            rules={[
              {
                required: true,
                message: 'Hãy nhập mô tả sản phẩm!',
              },
            ]}
          >
            <InputForm onChange={onChange} value={stateProduct.description} name="description"/>
          </Form.Item>

          <Form.Item
            label="Đánh giá sản phẩm"
            name="rating"
            rules={[
              {
                required: true,
                message: 'Hãy nhập đánh giá sản phẩm!',
              },
            ]}
          >
            <InputForm onChange={onChange} value={stateProduct.rating} name="rating"/>
          </Form.Item>

           <Form.Item
            label="Giảm giá"
            name="discount"
            rules={[
              {
                required: true,
                message: 'Hãy nhập discount sản phẩm!',
              },
            ]}
          >
            <InputForm onChange={onChange} value={stateProduct.discount} name="discount"/>
          </Form.Item>


          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: 'Hãy chọn hình ảnh sản phẩm!',
              },
            ]}
          >    
            <WrapperUploadFile  onChange={handleOnChangeAvatar} maxCount={1} fileList={stateProduct.fileList || []}>
              <div style={{display:'flex',flexDirection: 'column', alignItems: 'center' }}>
                  {stateProduct.image && (
                      <img src={stateProduct?.image} style={{
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
      </Modal>
      <DrawerComponent title ='Chi tiết sản phẩm' isOpen = {isOpenDraw} onClose = {handleOnCLose} width='50%' forceRender>
        <LoadingComponent isPending={isPending}>
        <Form
            name="update"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onUpdateProduct}
            form={detailForm}
            autoComplete="off"
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên sản phẩm!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateProductDetail.name} name="name"/>
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập loại sản phẩm!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateProductDetail.type} name="type"/>
            </Form.Item>

            <Form.Item
              label="Số lượng tồn kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập số lượng tồn kho!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateProductDetail.countInStock} name="countInStock"/>
            </Form.Item>

            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập giá sản phẩm!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateProductDetail.price} name="price"/>
            </Form.Item>

            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mô tả sản phẩm!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateProductDetail.description} name="description"/>
            </Form.Item>

            <Form.Item
              label="Đánh giá sản phẩm"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập đánh giá sản phẩm!',
                },
              ]}
            >
              <InputForm onChange={onChangeDetail} value={stateProductDetail.rating} name="rating"/>
            </Form.Item>

            <Form.Item
              label="Giảm giá"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập discount sản phẩm!',
                  },
                ]}
            > 
              <InputForm onChange={onChangeDetail} value={stateProductDetail.discount} name="discount"/>
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn hình ảnh sản phẩm!',
                },
              ]}
            >    
              <WrapperUploadFile  onChange={handleOnChangeAvatarDetail} maxCount={1} fileList={stateProductDetail.fileList || []}>
                <div style={{display:'flex',flexDirection: 'column', alignItems: 'center' }}>
                    {stateProductDetail.image && (
                        <img src={stateProductDetail?.image} style={{
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
          <Button key="delete" type="primary" danger onClick={handleDeleteProduct}>Có</Button>,
        ]}>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>
 </div>
  )
}

export default AdminProduct
