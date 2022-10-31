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


export const getUserInfo  = async ()  => {
  try {
    const res = await publicRequest.get(`/users/info`);
    return res;    
  } catch (err) {
    console.log(err);
  }
}

export const searchIpInfo = async (adminId, ip) => {
  try {
    console.log(ip);
    const res = await adminRequest.get(`/${adminId}/ip`, {
      params: {
        ip: ip.ip
        }
        });
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

export const updateIpBanned = async (adminId, ipBanned) => {
  try {
    console.log(adminId, ipBanned);
    const res = await adminRequest.put(`/${adminId}/ban`, ipBanned);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const deleteIpBanned = async (adminId, ipBanned) => {
  try {
    const res = await adminRequest.delete(`/${adminId}/ban`, {data: ipBanned});
    return res;
  } catch (err) {
    console.log(err);
  }
}
