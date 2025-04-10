import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Auth from '../pages/Auth';
import Register from '../pages/Register';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import OrderHistory from "../pages/OrderHistory";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext); // Get the authentication state from context

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />

        {/* Redirect if user is already logged in */}
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 




