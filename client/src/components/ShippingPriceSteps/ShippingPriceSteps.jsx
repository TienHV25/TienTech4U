import React, {  useMemo } from 'react'
import { ShoppingCart, Truck, Gift } from 'lucide-react'
import StepItem from './StepItems';

const ShippingPriceSteps = ({ totalPrice = 0, selectedItems = [] }) => {
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

  const currentShippingFee = useMemo(() => {
    if (totalPrice === 0) return 0;
    if (totalPrice >= 2000000) return 0;
    if (totalPrice >= 1000000) return 10000;
    return 20000;
  }, [totalPrice])

  const getCurrentStep = () => {
    if (totalPrice >= 2000000) return 0;
    if (totalPrice >= 1000000) return 1;
    return 2
  }

  const getProgressInfo = () => {
    if (totalPrice >= 2000000) {
      return {
        isComplete: true,
        remaining: 0,
        nextTier: null,
        progress: 100
      }
    }
    
    if (totalPrice >= 1000000) {
      const remaining = 2000000 - totalPrice;
      return {
        isComplete: false,
        remaining,
        nextTier: 'miễn phí giao hàng',
        progress: Math.min((totalPrice / 2000000) * 100, 95)
      }
    }
    
    const remaining = 1000000 - totalPrice;
    return {
      isComplete: false,
      remaining,
      nextTier: 'giảm phí giao hàng',
      progress: Math.min((totalPrice / 1000000) * 100, 95)
    }
  }

  const progressInfo = getProgressInfo()
  const currentStep = getCurrentStep()

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          margin: '0',
          color: '#333'
        }}>
          Thông tin phí giao hàng
        </h3>
      </div>

      <div style={{
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#389e0d'
            }}>
              Tổng giá trị đơn hàng: {totalPrice.toLocaleString('vi-VN')} VNĐ
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '4px'
            }}>
              Phí giao hàng hiện tại: {currentShippingFee.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>
          <div style={{
            backgroundColor: '#52c41a',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            padding: '4px 8px',
            borderRadius: '12px',
            minWidth: '24px',
            textAlign: 'center'
          }}>
            {selectedItems.length}
          </div>
        </div>
      </div>

      {!progressInfo.isComplete && (
        <div style={{
          backgroundColor: '#fff7e6',
          border: '1px solid #ffd591',
          borderRadius: '6px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#d46b08',
            marginBottom: '8px'
          }}>
            Còn {progressInfo.remaining.toLocaleString('vi-VN')} VNĐ để được {progressInfo.nextTier}
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressInfo.progress}%`,
              height: '100%',
              backgroundColor: '#1890ff',
              transition: 'width 0.3s ease',
              borderRadius: '4px'
            }} />
          </div>
        </div>
      )}

      <div>
        {shippingTiers.map((tier, index) => (
          <StepItem
            key={index}
            tier={tier}
            index={index}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
          />
        ))}
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#fafafa',
        borderRadius: '6px'
      }}>
        <div style={{
          fontSize: '12px',
          color: '#666'
        }}>
          💡 Mua thêm sản phẩm để tiết kiệm phí giao hàng!
        </div>
      </div>
    </div>
  )
}

export default ShippingPriceSteps