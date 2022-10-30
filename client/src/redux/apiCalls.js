import { loginFailure, loginStart, loginSuccess} from './userRedux';
import { registerFailure, registerStart, registerSuccess } from './registerRedux';
import { publicRequest, adminRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
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


export const getUserInfo  = async (userId)  => {
  try {
    const res = await publicRequest.get(`/users/${userId}/info`);
    return res;    
  } catch (err) {
    console.log(err);
  }
}

export const getAllUsers = async (userId) => {
  try {
    const res = await adminRequest.get(`/${userId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (adminId, userId, user) => {
  try {
    console.log(adminId, userId, user);
    const res = await adminRequest.put(`/${adminId}/users/${userId}/ban`, user);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getIpBanned = async (userId) => {
  try {
    const res = await adminRequest.get(`/${userId}/ban`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
