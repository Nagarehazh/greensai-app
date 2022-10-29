import axios from 'axios';
// https://greensai-app.herokuapp.com
// http://localhost:5000
const BASE_URL = 'https://greensai-ecommerce.vercel.app/api';

export const publicRequest = axios.create({
  baseURL: BASE_URL,

});

