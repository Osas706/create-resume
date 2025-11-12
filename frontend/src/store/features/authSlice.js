import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    message: null,
    token: null,
    user: null,
    loading: false
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = ''
      state.user = null
      localStorage.removeItem('token')
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(registerUser.pending, (state) => { state.loading = true })
  //     .addCase(registerUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload.user;
  //     })
  //     .addCase(forgotPassword.fulfilled, (state, action) => {
  //       state.message = action.payload.message;
  //     })
  //     .addCase(resetPassword.fulfilled, (state, action) => {
  //       state.message = action.payload.message;
  //     })
  // }
});

export const {login, logout, setLoading} = authSlice.actions

export default authSlice.reducer