import React, { useEffect, useRef, useState } from 'react'
import { Button,Form, Input, Modal, Select, Space } from "antd"
import {SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperHeader } from './style'
import * as orderservice from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from '../../utils'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useMemo } from 'react';



const AdminOrder = () => {
  const [rowSelected,setRowSelected] = useState('')
  const searchInput = useRef(null)
  const COLORSPAYMENT = ['#0088FE', '#00C49F'];
  const COLORSISPAID = ['#FFBB28', '#FF8042'];
  const COLORSISDELI = ['#A28BFF', '#FF66C4'];
  
  const getAllOrder = async() => {
    let storageData= localStorage.getItem('access_token')
    if(storageData && isJsonString(storageData) ) {
    storageData = JSON.parse(storageData)
      const res = await orderservice.getAllOrder(storageData)
      return res
    }
  }


  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrder,
  })

  const handleSearch = ( selectedKeys, confirm, dataIndex) => {
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
        title: 'Tên khách hàng',
        dataIndex: 'fullName',
        sorter: (a, b) => a.fullName.length - b.fullName.length,
        ...getColumnSearchProps('fullName')
      
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        sorter: (a, b) => Number(a.phone) - Number(b.phone),
        ...getColumnSearchProps('phone')
         
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        sorter: (a, b) => a.address.length - b.address.length,
        ...getColumnSearchProps('address')
       
       
    },
    {
        title: 'Thanh toán',
        dataIndex: 'isPaid',
        sorter: (a, b) => Number(a.isPaid) - Number(b.isPaid),
        render: (value) => value ? 'Đã thanh toán' : 'Chưa thanh toán',
        ...getColumnSearchProps('isPaid')
    },
    {
        title: 'Giao hàng',
        dataIndex: 'isDelivered',
        sorter: (a, b) => Number(a.isDelivered) - Number(b.isDelivered),
        render: (value) => value ? 'Đã giao' : 'Chưa giao',
        ...getColumnSearchProps('isDelivered')
    },
    {
        title: 'Phương thức thanh toán',
        dataIndex: 'paymentMethod',
        sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
        ...getColumnSearchProps('paymentMethod')
       
       
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        sorter: (a, b) => Number(a.totalPrice) - Number(b.totalPrice),
        ...getColumnSearchProps('totalPrice')
       
       
    }
    ]

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return {...order,key:order._id,fullName:order.shippingAddress.fullName,
      phone:order.shippingAddress.phone,address:order.shippingAddress.address}
  })

  const paymentChartData = useMemo(() => {
    if (!orders?.data) return [];

    const counts = orders.data.reduce((acc, order) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([method, count]) => ({
      name: method === 'Thanh toán bằng tiền mặt' ? 'Tiền mặt' : 'PayPal',
      value: count
    }));
  }, [orders]);

  const isPaidChartData = useMemo(() => {
    if (!orders?.data) return [];

    const counts = orders.data.reduce((acc, order) => {
      acc[order.isPaid] = (acc[order.isPaid] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([method, count]) => ({
      name: method === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán',
      value: count
    }));
  }, [orders]);

 const isDeliveryChartData = useMemo(() => {
  if (!orders?.data) return [];

  const counts = orders.data.reduce((acc, order) => {
      acc[order.isDelivered] = (acc[order.isDelivered] || 0) + 1; // đúng field
      return acc;
    }, {});

    return Object.entries(counts).map(([method, count]) => ({
      name: method === 'true' ? 'Đã giao hàng' : 'Chưa giao hàng',
      value: count
    }));
  }, [orders]);
 
  return (
    <div>
    <WrapperHeader>
       Quản lý đơn hàng
    </WrapperHeader>
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <PieChart width={450} height={450}>
        <Pie
          data={paymentChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {paymentChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORSPAYMENT[index % COLORSPAYMENT.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <PieChart width={450} height={450}>
        <Pie
          data={isPaidChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {isPaidChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORSISPAID[index % COLORSISPAID.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <PieChart width={450} height={450}>
        <Pie
          data={isDeliveryChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {isDeliveryChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORSISDELI[index % COLORSISDELI.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
    <div style={{marginTop:'35px'}}>
      <TableComponent columns={columns} data={dataTable}  onRow={(record) => {
        return {
          onClick: () => {
            setRowSelected(record._id)
          }
        }
      }
        
      }  />
    </div>
    
 </div>
  )
}

export default AdminOrder
