import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const index = state.products.findIndex((item) => item._id === product._id);
      if (index === -1) {
        state.products.push(product);
      } else {
        state.products[index].quantity += product.quantity;
      }
      state.quantity += product.quantity;
      state.total += product.price * product.quantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      const product = action.payload;
      const index = state.products.findIndex((item) => item._id === product);
      if (index !== -1) {
        state.quantity -= state.products[index].quantity;
        state.total -= state.products[index].price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const product = action.payload;
      const index = state.products.findIndex((item) => item._id === product);
      if (index !== -1) {
        state.products[index].quantity += 1;
        state.quantity += 1;
        state.total += state.products[index].price;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const index = state.products.findIndex((item) => item._id === product);
      if (index !== -1) {
        state.products[index].quantity -= 1;
        state.quantity -= 1;
        state.total -= state.products[index].price;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

