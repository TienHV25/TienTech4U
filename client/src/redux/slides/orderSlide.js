import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    orderItems:[],
    shippingAddress: {},
    paymentMethod:'',
    itemPrice:0,
    shippingPrice:0,
    taxPrice:0,
    totalPrice:0,
    user:'',
    isPaid:false,
    paidAt:'',
    isDelivered:false,
    deliveredAt:'',
    }

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state,action) => {
        const {orderItem} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
        if(itemOrder){
            itemOrder.amount += orderItem?.amount
        }else{
            state.orderItems.push(orderItem)
        }
    },
   removeOrderProduct: (state, action) => {
    const { productId } = action.payload
    state.orderItems = state?.orderItems?.filter((item) => item?.product !== productId)
   },
   updateOrderAmount: (state, action) => {
    const { productId, amount } = action.payload
    const item = state?.orderItems?.find((item) => item?.product === productId);
    if (item && amount >= 1) {
        item.amount = amount
    }
   },
   removeOrderProductAll: (state, action) => {
    const {selectedItems} = action.payload
    if(selectedItems?.length === state.orderItems.length ){
        state.orderItems = []
    }
   },
  }
})

// Action creators are generated for each case reducer function
export const { addOrderProduct,removeOrderProduct,updateOrderAmount,removeOrderProductAll } =  orderSlice.actions

export default  orderSlice.reducer