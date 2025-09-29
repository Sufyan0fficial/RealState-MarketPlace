import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData:null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state,action) => {
        console.log('new paylaod coming is',action.payload)
        state.userData = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess } = userSlice.actions

export default userSlice.reducer