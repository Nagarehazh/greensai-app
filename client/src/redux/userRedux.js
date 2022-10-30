import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,

  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      console.log(action.payload);
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
      
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserInfoSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    getUserInfoFailure: (state) => {
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, getUserInfoSuccess, getUserInfoFailure } = userSlice.actions;
export default userSlice.reducer;

