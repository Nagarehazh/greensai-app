import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/default';
import GlobalStyles from '../styles/globals';
import { Container } from '../themes/LayoutStyles';
import {
  Home,
  ProductList,
  Product,
  Register,
  Login,
  Cart,
  Success,
} from '.';

function App() {
  const user = false;

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Container>
  );
}

export default App;
