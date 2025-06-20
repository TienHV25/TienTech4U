import React, { useState } from 'react'
import { UserOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import { Menu } from 'antd'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'

const Adminpage = () => {
  const items = [
    {
      key: 'user',
      icon: <UserOutlined/>,
      label: 'Người dùng',
    },
    {
      key: 'product',
      icon: <ShoppingCartOutlined/>,
      label: 'Sản phẩm',
    },
  ]
  const [selectedKey, setSelectedKey] = useState('')
  const handleOnClick = ({  key }) => {
    setSelectedKey(key)
  }
  const renderPage = (key) => {
     switch(key) {
      case 'user': 
        return (
          <AdminUser />
        )
      case 'product': 
        return (
          <AdminProduct />
        )
      default: 
        return <></>
     }
  }
  return (
    <div style={{display:'flex',height:'100vh',boxShadow:'1px 1px 2px #ccc'}}>
        <Menu
        mode="inline"
        defaultSelectedKeys={['231']}
        onClick={handleOnClick}
        style={{
          width: 256,
        }}
        items={items}
        />
        <div style={{flex:1,padding:'15px'}}>
           {renderPage(selectedKey)}
        </div>
     </div>
  )
}
export default Adminpage
