import axios from 'axios';
// https://greensai-ecommerce-app.herokuapp.com
// http://localhost:5000
const BASE_URL = 'https://greensai-ecommerce-app.herokuapp.com';


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const adminRequest = axios.create({
  baseURL: `${BASE_URL}/admin`,
  
});


