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
      if (action.payload ) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
      
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.response.data;
    },
    
  },
});

export const { loginStart, loginSuccess, loginFailure} = userSlice.actions;
export default userSlice.reducer;

