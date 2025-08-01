import React from 'react'
import { ShoppingCart, Truck, Gift } from 'lucide-react'
 
const shippingTiers = [
    {
      threshold: 2000000,
      fee: 0,
      title: 'Miễn phí giao hàng',
      description: 'Đơn hàng từ 2.000.000 VNĐ',
      icon: Gift,
      color: '#52c41a'
    },
    {
      threshold: 1000000,
      fee: 10000,
      title: 'Phí giao hàng 10.000 VNĐ',
      description: 'Đơn hàng từ 1.000.000 VNĐ',
      icon: Truck,
      color: '#1890ff'
    },
    {
      threshold: 0,
      fee: 20000,
      title: 'Phí giao hàng 20.000 VNĐ', 
      description: 'Đơn hàng dưới 1.000.000 VNĐ',
      icon: ShoppingCart,
      color: '#faad14'
    }
  ]

const StepItem = ({ tier, index, isActive, isCompleted }) => {
    const IconComponent = tier.icon
    
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: index < shippingTiers.length - 1 ? '16px' : '0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '12px' }}>
            <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            backgroundColor: isCompleted ? '#52c41a' : isActive ? '#1890ff' : '#e0e0e0',
            color: isCompleted || isActive ? 'white' : '#999'
            }}>
            <IconComponent size={16} />
            </div>
            {index < shippingTiers.length - 1 && (
            <div style={{
                width: '2px',
                height: '24px',
                marginTop: '4px',
                backgroundColor: isCompleted ? '#52c41a' : '#e0e0e0',
                transition: 'all 0.2s'
            }} />
            )}
        </div>
        
        <div style={{ flex: 1, paddingBottom: '16px' }}>
            <h4 style={{
            fontSize: '14px',
            fontWeight: '500',
            margin: '0 0 4px 0',
            color: isActive ? '#1890ff' : isCompleted ? '#52c41a' : '#666',
            transition: 'all 0.2s'
            }}>
            {tier.title}
            </h4>
            <p style={{ 
            fontSize: '12px', 
            color: '#999', 
            margin: '0' 
            }}>
            {tier.description}
            </p>
        </div>
        </div>
    )
  }
  
export default StepItem