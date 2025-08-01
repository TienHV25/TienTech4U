import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  search: ''
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state,action) => {
      state.search = action.payload
    },
    resetSearchProduct: (state) => {
      state.search = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { searchProduct,resetSearchProduct } = productSlice.actions

export default productSlice.reducer