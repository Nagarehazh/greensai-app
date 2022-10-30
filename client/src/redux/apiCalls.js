import { loginFailure, loginStart, loginSuccess, getUserInfoSuccess, getUserInfoFailure } from './userRedux';
import { registerFailure, registerStart, registerSuccess } from './registerRedux';
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post('/register', user);
    dispatch(registerSuccess(res.data));
    login(dispatch, user);
  } catch (err) {
    dispatch(registerFailure());
  }
};


export const getUserInfo = async (dispatch, userId) => {
  try {
    // get Ip address from user and sent into body
    // const res = await publicRequest.get(`/users/${userId}/info`, {
    //   params: {
    //     ip,
    //   },
    // });

    // get Ip address from user and sent into header
    const res = await publicRequest.get(`/users/${userId}/info`);


    console.log(res.data, "esto llegó *****");

    dispatch(getUserInfoSuccess(res.data));
  } catch (err) {
    dispatch(getUserInfoFailure());
  }
}


