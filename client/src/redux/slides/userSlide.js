import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      name: '',
      email: '',
      phone: '',
      address: '',
      avatar: '',
      access_token: '',
      isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state,action) => {
        const {name = '',email = '',access_token = '',phone = '',address = '',avatar = '',isAdmin} = action.payload
        state.name = name || email?.split('@')[0]
        state.email = email
        state.phone = phone
        state.address = address
        state.avatar = avatar
        state.access_token = access_token
        state.isAdmin = isAdmin
    },
    resetUser: (state) => {
        state.name = ''
        state.email = ''
        state.phone = ''
        state.address = ''
        state.avatar = ''
        state.access_token = ''
        state.isAdmin = false
  },
  }
})


export const { updateUser,resetUser } = userSlice.actions

export default userSlice.reducer