// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext'; // Import the auth context

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context

  return (
    <nav>
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>

        {/* Show Order History only if user is logged in */}
        {user && (
          <li><Link to="/order-history" className="nav-link">MyOrder</Link></li>
        )}

        {/* Conditional rendering based on login status */}
        {!user ? (
          <>
            <li><Link to="/auth">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            {/* Logout button */}
            <button onClick={logout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;



