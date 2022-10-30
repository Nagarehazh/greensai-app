import axios from 'axios';
// https://greensai-app.herokuapp.com
// http://localhost:5000
const BASE_URL = 'http://localhost:5000';


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const adminRequest = axios.create({
  baseURL: `${BASE_URL}/admin`,
  
});


